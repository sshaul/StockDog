import argparse

from flask import Flask
from flask import make_response
from flask import jsonify

from stock import stock_api

app = Flask(__name__)

app.register_blueprint(stock_api)

@app.route('/')
@app.route('/api/v1.0')
def index():
   return "What's good StockDog!"


@app.errorhandler(404)
def not_found(error):
   return make_response(jsonify({'error': 'Not found'}), 404)


def getPortNum(defaultPort=5000):
   parser = argparse.ArgumentParser()
   parser.add_argument('-p','--port', type=int, help='specify the port number')
   args = parser.parse_args()
   return args.port or defaultPort 


if __name__ == '__main__':
   app.run(debug=True, port=getPortNum())
