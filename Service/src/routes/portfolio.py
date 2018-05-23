from datetime import datetime
from flask import Blueprint, request, Response, g, jsonify
import simplejson as json

from routes import stock
from util.utility import Utility
from util.errMap import errors

portfolio_api = Blueprint('portfolio_api', __name__)


@portfolio_api.route('/api/portfolio', methods=['POST'])
def post_portfolio():
   body = request.get_json()
   now = datetime.now()

   if 'leagueId' in body:
      
      if 'inviteCode' in body:
         g.cursor.execute("SELECT inviteCode, startPos FROM League WHERE id = %s", body['leagueId'])
         row = g.cursor.fetchone()

         if row is None:
            return Response(errors['nonexistentLeague'], status=404)
         
         if body['inviteCode'] == row['inviteCode']:
            g.cursor.execute("INSERT INTO Portfolio(name, buyPower, userId, leagueId) VALUES (%s, %s, %s, %s)",
               [body['name'], row['startPos'], body['userId'], body['leagueId']])

            g.cursor.execute("INSERT INTO PortfolioHistory(portfolioId, datetime, value) VALUES (%s, %s, %s)",
               [g.cursor.lastrowid, str(now), row['startPos']])
         else:
            return Response(errors['inviteCodeMismatch'], status=400)
      
      else:
         return Response(errors['missingInviteCode'], status=400)
   
   else:      
      g.cursor.execute("INSERT INTO Portfolio(name, buyPower, userId) VALUES (%s, %s, %s)", 
         [body['name'], body['buyPower'], body['userId']])

      g.cursor.execute("INSERT INTO PortfolioHistory(portfolioId, datetime, value) VALUES (%s, %s, %s)",
         [g.cursor.lastrowid, str(now), body['buyPower']])

   return jsonify(id=g.cursor.lastrowid)


@portfolio_api.route('/api/portfolio', methods=['GET'])
def get_portfolios():
   userId = request.args.get('userId')
   leagueId = request.args.get('leagueId')

   if userId and leagueId:
      return Response(errors['unsupportedPortfolioGet'], status=400)

   if leagueId:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, " +
         "l.name AS league, l.id AS leagueId, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id " +
         "WHERE l.id = %s", leagueId)

   elif userId:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, " +
         "l.name AS league, l.id AS leagueId, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id " +
         "WHERE userId = %s", userId)
   else:
      g.cursor.execute("SELECT p.id, p.buyPower, p.name AS nickname, p.userId, " +
         "l.name AS league, l.id AS leagueId, l.start, l.end, l.startPos " +
         "FROM Portfolio AS p LEFT JOIN League as l ON p.leagueId = l.id")

   portfolios = g.cursor.fetchall()
   portfoliosWithValues = add_portfolio_values(portfolios)

   return json.dumps(portfoliosWithValues, default=Utility.dateToStr)


def add_portfolio_values(portfolios):
   for portfolio in portfolios:
      portfolio['value'] = get_recent_portfolio_value(portfolio['id'])

   return portfolios


def get_recent_portfolio_value(portfolioId):
   g.cursor.execute("SELECT * FROM PortfolioHistory " + 
      "WHERE portfolioId = %s ORDER BY datetime DESC LIMIT 1", portfolioId)

   portfolioValue = g.cursor.fetchone()
   if portfolioValue:
      return float(portfolioValue['value'])
   else:
      return -1


@portfolio_api.route('/api/portfolio/<portfolioId>', methods=['GET'])
def get_portfolio(portfolioId):
   g.cursor.execute("SELECT p.id AS id, ticker, shareCount, avgCost, name, buyPower, leagueId " +
      "FROM Portfolio AS p LEFT JOIN PortfolioItem as pi ON p.id = pi.portfolioId " + 
      "WHERE p.id = %s", portfolioId)

   portfolio = g.cursor.fetchall()
   portfolioWithValues = add_portfolio_values(portfolio)
   return json.dumps(portfolioWithValues)


@portfolio_api.route('/api/portfolio/<portfolioId>/value', methods=['GET'])
def get_portfolio_value(portfolioId):
   portfolioItems = json.loads(get_portfolio(portfolioId))
   value = 0
   for item in portfolioItems:
      if item['ticker'] is not None:
         value += float(json.loads(stock.get_history(item['ticker'], 'now'))['price']) * item['shareCount']

   return json.dumps({"value": value + float(portfolioItems[0]['buyPower'])})


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['POST'])
def post_portfolio_history(portfolioId):
   body = request.get_json()
   now = datetime.now()

   g.cursor.execute("INSERT INTO PortfolioHistory(portfolioId, datetime, value) VALUES (%s, %s, %s)",
      [portfolioId, str(now), body['value']])

   return Response(status=200)


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['GET'])
def get_portfolio_history(portfolioId):

   g.cursor.execute("SELECT value, datetime FROM Portfolio AS p JOIN PortfolioHistory AS ph ON p.id = ph.portfolioId " +
      "WHERE portfolioId = %s", portfolioId)

   portfolio = g.cursor.fetchall()
   return json.dumps(portfolio, default=str)
