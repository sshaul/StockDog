from flask import Blueprint, request, Response
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
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   if 'leagueId' in body:
      
      if 'inviteCode' in body:
         cursor.execute("SELECT inviteCode, startPos FROM League WHERE id = %s", body['leagueId'])
         row = cursor.fetchone()
         
         if body['inviteCode'] == row['inviteCode']:
            cursor.execute("INSERT INTO Portfolio(name, buyPower, userId, leagueId) VALUES (%s, %s, %s, %s)",
               [body['name'], row['startPos'], body['userId'], body['leagueId']])
         else:
            return Response("Invite code does not match the league's invite code", status=400)
      
      else:
         return Response("Invite code was not provided to join league", status=400)
   
   else:
      cursor.execute("INSERT INTO Portfolio(name, buyPower, userId) VALUES (%s, %s, %s)", 
         [body['name'], body['buyPower'], body['userId']])
   conn.commit()

   return Response(status=200)


@portfolio_api.route('/api/portfolio', methods=['GET'])
def get_portfolios():
   userId = request.args.get('userId')
   leagueId = request.args.get('leagueId')
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   if userId and leagueId:
      return Response("Please provide only the userId or only the leagueId", status=400)

   if leagueId:
      cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id WHERE l.id = %s", leagueId)

   elif userId:
      cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id WHERE userId = %s", userId)
   else:
      cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, l.name AS league, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id")

   portfolios = cursor.fetchall()
   return json.dumps(portfolios, default=dateToStr)


@portfolio_api.route('/api/portfolio/<portfolioId>', methods=['GET'])
def get_portfolio(portfolioId):
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("SELECT ticker, shareCount, avgCost, name, buyPower " +
      "FROM Portfolio AS p LEFT JOIN PortfolioItem as pi ON p.id = pi.portfolioId " + 
      "WHERE p.id = %s", portfolioId)

   portfolio = cursor.fetchall()
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
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   now = datetime.now()

   cursor.execute("INSERT INTO PortfolioHistory(portfolioId, day, value) VALUES (%s, %s, %s)",
      [portfolioId, now.strftime("%Y-%m-%d"), body['value']])
   conn.commit()

   return Response(status=200)


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['GET'])
def get_portfolio_history(portfolioId):
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("SELECT value, day FROM Portfolio AS p JOIN PortfolioHistory AS ph ON p.id = ph.portfolioId " +
      "WHERE portfolioId = %s", portfolioId)

   portfolio = cursor.fetchall()
   return json.dumps(portfolio, default=str)


def dateToStr(obj):
   if isinstance(obj, datetime):
      return obj.__str__()