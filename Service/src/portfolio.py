from flask import Blueprint, abort, request, Response
from util import logger
from datetime import datetime
import pymysql
import simplejson as json

log = logger.Logger(True, True, True)

portfolio_api = Blueprint('portfolio_api', __name__)

@portfolio_api.route('/api/portfolio', methods=['POST'])
def post_portfolio():
   body = request.get_json()
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      log.error('Config file does not exist or is poorly formatted ' + str(e))
      abort(500)

   conn = pymysql.connect(user=config['username'], password=config['password'], database='StockDog')
   cursor = conn.cursor()
   cursor.execute("INSERT INTO Portfolio(buyPower, userId) VALUES (%s, %s)", 
      (body['buyPower'], body['userId']))
   conn.commit()

   return Response(status=200)


@portfolio_api.route('/api/portfolio/<portfolioId>', methods=['GET'])
def get_portfolio(portfolioId):
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      log.error('Config file does not exist or is poorly formatted ' + str(e))
      abort(500)

   conn = pymysql.connect(user=config['username'], password=config['password'], database='StockDog', 
      cursorclass=pymysql.cursors.DictCursor)
   cursor = conn.cursor()
   cursor.execute("SELECT ticker, shareCount, avgCost, buyPower FROM Portfolio AS p JOIN PortfolioItem as pi ON p.id = pi.portfolioId " + 
      "WHERE p.id = %s", portfolioId)

   portfolio = cursor.fetchall()
   log.debug(portfolio, isPprint=True)

   return json.dumps(portfolio)


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['POST'])
def post_portfolio_history(portfolioId):
   body = request.get_json()
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      log.error('Config file does not exist or is poorly formatted ' + str(e))
      abort(500)

   conn = pymysql.connect(user=config['username'], password=config['password'], database='StockDog', 
      cursorclass=pymysql.cursors.DictCursor)
   cursor = conn.cursor()

   now = datetime.now()

   cursor.execute("INSERT INTO PortfolioHistory(portfolioId, day, value) VALUES (%s, %s, %s)",
      [portfolioId, now.strftime("%Y-%m-%d"), body['value']])
   conn.commit()

   return Response(status=200)


@portfolio_api.route('/api/portfolio/<portfolioId>/history', methods=['GET'])
def get_portfolio_history(portfolioId):
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      log.error('Config file does not exist or is poorly formatted ' + str(e))
      abort(500)

   conn = pymysql.connect(user=config['username'], password=config['password'], database='StockDog', 
      cursorclass=pymysql.cursors.DictCursor)
   cursor = conn.cursor()
   cursor.execute("SELECT * FROM Portfolio AS p JOIN PortfolioHistory AS ph ON p.id = ph.portfolioId " +
      "WHERE portfolioId = %s", portfolioId)

   portfolio = cursor.fetchall()
   log.debug(portfolio, isPprint=True)

   return json.dumps(portfolio, default=str)

