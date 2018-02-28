import argparse
from util import logger

from flask import Flask
from flask import make_response, request
from flask import jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask import jsonify
import pymysql
from stock import stock_api
from portfolio import portfolio_api
from login import Login
from session import session_api
import json
import os.path

app = Flask(__name__)

CORS(app)

login = Login(app)
app.register_blueprint(stock_api)
app.register_blueprint(login.login_api)
app.register_blueprint(portfolio_api)
app.register_blueprint(session_api)

log = logger.Logger(True, True, True)

@app.route('/')
@app.route('/api/v1.0')
def index():
   return "What's good StockDog!"


@app.errorhandler(404)
def not_found(error):
   return make_response(jsonify({'error': 'Not found'}), 404)


def getPortNum(defaultPort=5005):
   parser = argparse.ArgumentParser()
   parser.add_argument('-p','--port', type=int, help='specify the port number')
   args = parser.parse_args()
   return args.port or defaultPort 

if __name__ == '__main__':
   app.run(debug=True, port=getPortNum(), host='0.0.0.0')

#logout
