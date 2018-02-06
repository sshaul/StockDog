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
#is host and port and db required
conn = pymysql.connect(user= "root", password = "#oth18", database="Stockdog")
#used to execute queries
c = conn.cursor()
#c.execute("show tables")


#used for debugging - making sure that the tables are accessible
#for (table_name,) in c:
#   log.info(table_name)


#@app.route('/user/login', methods = ['POST'])


@app.route('/register', methods=["POST"])
def createAccount():
   firstName = str(request.form["first name"])
   lastName = str(request.form["last name"])
   email = str(request.form["email"])
   password = str(request.form["password"])


   c.execute("INSERT INTO User VALUES (%d, %s, %s, %s, %s, 1, firstName, lastName, email, password)");
   conn.commit();
   #return redirect to new page once user created an account (need redirecting page url)




if __name__ == '__main__':
   app.run(debug=True, port=getPortNum(), host='0.0.0.0')

