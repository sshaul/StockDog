from flask import Blueprint, abort, request, Response
from util import logger
import pymysql
import json

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
   cursor.execute("SELECT * FROM Portfolio WHERE id = %s", portfolioId)

   portfolio = cursor.fetchone()
   log.debug(portfolio, isPprint=True)
   portfolio['buyPower'] = float(portfolio['buyPower'])

   return json.dumps(portfolio)

