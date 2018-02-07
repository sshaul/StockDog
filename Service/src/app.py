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
#from login import login_api


app = Flask(__name__)

CORS(app)

app.register_blueprint(stock_api)
#app.register_blueprint(login_api)

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



login_manager = LoginManager()
login_manager.init_app(app)

#connecting to db
conn = pymysql.connect(user= "root", password = "", database="Stockdog")
#used to execute queries
c = conn.cursor()
#c.execute("show tables")


#used for debugging - making sure that the tables are accessible
#for (table_name,) in c:
#   log.info(table_name)


#@app.route('/user/login', methods = ['POST'])
#def login():



@app.route('/register', methods=["POST"])
def createAccount():
   data = request.get_json()
   firstName = data['firstName']
   lastName = data['lastName']
   email = data['email']
   password = data['password']


   c.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",(firstName, lastName, email, password));
   conn.commit();
   return ""



if __name__ == '__main__':
   app.run(debug=True, port=getPortNum(), host='0.0.0.0')

