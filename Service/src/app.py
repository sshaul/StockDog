import argparse
from flask import Flask, request, g, Response
from flask_cors import CORS

from auth.user import user_api

from routes.charts import charts_api
from routes.iex import iex_api
from routes.league import league_api
from routes.nuke import nuke_api
from routes.portfolio import portfolio_api
from routes.stock import stock_api
from routes.transaction import transaction_api
from routes.watchlist import watchlist_api

from util.db_connection import getDBConn
from util.logger import Logger

app = Flask(__name__)
CORS(app)

app.register_blueprint(charts_api)
app.register_blueprint(iex_api)
app.register_blueprint(league_api)
app.register_blueprint(nuke_api)
app.register_blueprint(portfolio_api)
app.register_blueprint(stock_api)
app.register_blueprint(transaction_api)
app.register_blueprint(watchlist_api)
app.register_blueprint(user_api)


@app.before_request
def setup():
   g.log = Logger(True, True, True)

   if getattr(g, 'db', None) is None:
      try:
         g.db = getDBConn()
         g.cursor = g.db.cursor()
      except Exception as e:
         g.log.error(e)
         return Response('Failed to make connection to database', status=500)


@app.route('/')
@app.route('/api/v1.0')
def index():
   return "What's good StockDog!"


@app.errorhandler(404)
def not_found(error):
   return Response('Not Found', status=404)


def getPortNum(defaultPort=5005):
   parser = argparse.ArgumentParser()
   parser.add_argument('-p','--port', type=int, help='specify the port number')
   args = parser.parse_args()
   return args.port or defaultPort


@app.after_request
def teardown(response):
   if getattr(g, 'db', None) is not None:
      g.db.close()

   return response


if __name__ == '__main__':
   app.run(debug=True, port=getPortNum(), host='0.0.0.0')
