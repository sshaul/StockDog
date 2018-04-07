from flask import Blueprint, request, Response
from util import logger
from datetime import datetime
import pymysql
import simplejson as json
import dbConn

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

   cursor.execute("INSERT INTO Portfolio(name, buyPower, userId) VALUES (%s, %s, %s)", 
      [body['name'], body['buyPower'], body['userId']])
   conn.commit()

   return Response(status=200)


@portfolio_api.route('/api/portfolio', methods=['GET'])
def get_portfolios():
   userId = request.args.get('userId')
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      print(e)
      return Response('Failed to make connection to database', status=500)

   if userId is not None:
      cursor.execute("SELECT * FROM Portfolio WHERE userId = %s", userId)
   else:
      cursor.execute("SELECT * FROM Portfolio")

   portfolios = cursor.fetchall()
   return json.dumps(portfolios)


@portfolio_api.route('/api/portfolio/<portfolioId>', methods=['GET'])
def get_portfolio(portfolioId):
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("SELECT ticker, shareCount, avgCost, name, buyPower FROM Portfolio AS p LEFT JOIN PortfolioItem as pi ON p.id = pi.portfolioId " + 
      "WHERE p.id = %s", portfolioId)

   portfolio = cursor.fetchall()
   return json.dumps(portfolio)


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

