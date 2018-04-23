from flask import Blueprint, request, Response, g, jsonify
from util import logger
from datetime import datetime
import pymysql
import simplejson as json
import dbConn
import stock

log = logger.Logger(True, True, True)

portfolio_api = Blueprint('portfolio_api', __name__)

@portfolio_api.route('/api/portfolio', methods=['POST'])
def post_portfolio():
   body = request.get_json()

   if 'leagueId' in body:
      
      if 'inviteCode' in body:
         g.cursor.execute("SELECT inviteCode, startPos FROM League WHERE id = %s", body['leagueId'])
         row = g.cursor.fetchone()
         
         if body['inviteCode'] == row['inviteCode']:
            g.cursor.execute("INSERT INTO Portfolio(name, buyPower, userId, leagueId) VALUES (%s, %s, %s, %s)",
               [body['name'], row['startPos'], body['userId'], body['leagueId']])
         else:
            return Response("Invite code does not match the league's invite code", status=400)
      
      else:
         return Response("Invite code was not provided to join league", status=400)
   
   else:
      g.cursor.execute("INSERT INTO Portfolio(name, buyPower, userId) VALUES (%s, %s, %s)", 
         [body['name'], body['buyPower'], body['userId']])

   return jsonify(id=g.cursor.lastrowid)


@portfolio_api.route('/api/portfolio', methods=['GET'])
def get_portfolios():
   userId = request.args.get('userId')
   leagueId = request.args.get('leagueId')

   if userId and leagueId:
      return Response("Please provide only the userId or only the leagueId", status=400)

   if leagueId:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id WHERE l.id = %s", leagueId)

   elif userId:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id WHERE userId = %s", userId)
   else:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id")

   portfolios = g.cursor.fetchall()
   return json.dumps(portfolios, default=dateToStr)


@portfolio_api.route('/api/portfolio/<portfolioId>', methods=['GET'])
def get_portfolio(portfolioId):
   
   g.cursor.execute("SELECT ticker, shareCount, avgCost, name, buyPower " +
      "FROM Portfolio AS p LEFT JOIN PortfolioItem as pi ON p.id = pi.portfolioId " + 
      "WHERE p.id = %s", portfolioId)

   portfolio = g.cursor.fetchall()
   return json.dumps(portfolio)


@portfolio_api.route('/api/portfolio/<portfolioId>/value', methods=['GET'])
def get_portfolio_value(portfolioId):
   portfolioItems = json.loads(get_portfolio(portfolioId))
   value = 0
   for item in portfolioItems:
      if item['ticker'] is not None:
         value += float(json.loads(stock.get_history(item['ticker'], 'now'))[0]['price']) * item['shareCount']

   return json.dumps(value + float(portfolioItems[0]['buyPower']))


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['POST'])
def post_portfolio_history(portfolioId):
   body = request.get_json()
   now = datetime.now()

   g.cursor.execute("INSERT INTO PortfolioHistory(portfolioId, day, value) VALUES (%s, %s, %s)",
      [portfolioId, now.strftime("%Y-%m-%d"), body['value']])

   return Response(status=200)


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['GET'])
def get_portfolio_history(portfolioId):

   g.cursor.execute("SELECT value, day FROM Portfolio AS p JOIN PortfolioHistory AS ph ON p.id = ph.portfolioId " +
      "WHERE portfolioId = %s", portfolioId)

   portfolio = g.cursor.fetchall()
   return json.dumps(portfolio, default=str)


# TODO move to util folder
def dateToStr(obj):
   if isinstance(obj, datetime):
      return obj.__str__()