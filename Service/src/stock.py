from flask import Blueprint, abort
from urllib.parse import urlencode
from util import logger
from pprint import pprint
from werkzeug.exceptions import *
from datetime import date, timedelta, datetime
import json
import requests
import re

log = logger.Logger(True, True, True)

DAY_AGO = 1
WEEK_AGO = 7
MONTH_AGO = 31
YEAR_AGO = 365

EST_HOURS_AHEAD = 3

stock_api = Blueprint('stock_api', __name__)

@stock_api.errorhandler(400)
@stock_api.errorhandler(404)
def malformed_request(error):
   if isinstance(error, BadRequest):
      return 'Request was formed incorrectly. ' + \
         'Valid lengths are day, week, month, year.', 400
   elif isinstance(error, NotFound):
      return 'Request was formed incorrectly. ' + \
         'The stock ticker is either invalid or unsupported.', 404
   else:
      return 'Something went wrong...', 400


@stock_api.route('/api/stock/<ticker>/history/<length>')
def get_history(ticker, length):
   try:
      function = getFunction(length)
      outputSize = getOutputSize(length)
   except Exception as e:
      abort(400)

   interval = getInterval(length)
   apiKey = getApiKey()

   queryParams = {
      'function' : function,
      'symbol' : ticker,
      'outputsize' : outputSize,
      'apikey' : apiKey
   }

   if interval:
      queryParams['interval'] = interval

   alphaVantageApi = 'https://www.alphavantage.co/query?'
   response = (requests.get(alphaVantageApi + urlencode(queryParams))).json()
   
   if response.get('Error Message'):
      abort(404)

   data = formatData(response, interval, length)

   return json.dumps(data)
    

def getFunction(length):
   if length == 'day' or length == 'week':
      return 'TIME_SERIES_INTRADAY'
   elif length == 'month' or length == 'year':
      return 'TIME_SERIES_DAILY'
   else:
      raise Exception('Invalid length provided')


def getOutputSize(length):
   if length == 'day' or length == 'month':
      return 'compact'
   elif length == 'week' or length == 'year':
      return 'full'
   else:
      raise Exception('Invalid length provided') 


def getInterval(length):
   if length == 'day':
      return '5min'
   elif length == 'week':
      return '15min'
   elif length == 'month' or length == 'year':
      return ''


def getApiKey():
   return '3UCU111LQLB5581W'


def formatData(jsonData, interval, length):
   if not interval:
      interval = 'Daily'

   timeSeriesData = jsonData['Time Series (' + interval + ')']

   slicedTimeSeriesData = []

   if length == 'day':
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, getLastWeekdayDelta(), '%Y-%m-%d %H:%M:%S')
   elif length == 'week':
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, WEEK_AGO, '%Y-%m-%d %H:%M:%S')
   elif length == 'month':
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, MONTH_AGO, '%Y-%m-%d')
   elif length == 'year':
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, YEAR_AGO, '%Y-%m-%d')
   else:
      raise Exception('Invalid length provided')

   return slicedTimeSeriesData


def getLastWeekdayDelta():
   today = date.today()
   if date.today().weekday() <= 4:
      return DAY_AGO
   else:
      daysAgo = 1
      dayBefore = today - timedelta(days=daysAgo)
      while dayBefore.weekday() > 4:
         daysAgo += 1
         dayBefore -= timedelta(days=daysAgo)

      return daysAgo


def formatDataInRange(timeSeriesData, timeDelta, dateFormat):
   slicedTimeSeriesData = []
   today = datetime.now()
   pastDate = today - timedelta(days=timeDelta)

   for (key, value) in timeSeriesData.items():
      keyTime = datetime.strptime(key, dateFormat)
      epochTimeEst = keyTime + timedelta(hours=3)

      if pastDate < keyTime:
         slicedTimeSeriesData.append({
            'time' : key,
            'epochTime' : keyTime.timestamp(),
            'price' : value['1. open']
         })

   slicedTimeSeriesData.sort(key=lambda item:item['epochTime'], reverse=False)
   return slicedTimeSeriesData
