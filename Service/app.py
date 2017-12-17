from flask import Flask
from flask import make_response
from flask import jsonify

app = Flask(__name__)


@app.route('/')
@app.route('/api/v1.0')
def index():
   return "What's good StockDog!"


@app.errorhandler(404)
def not_found(error):
   return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
   app.run(debug=True)
