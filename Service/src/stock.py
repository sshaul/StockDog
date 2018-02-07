from flask import Blueprint, abort
from urllib.parse import urlencode
from util import logger
from pprint import pprint
from werkzeug.exceptions import *
from datetime import date, timedelta, datetime
import json
import requests
import re
import time

log = logger.Logger(True, True, False)

TODAY = 0
DAY_AGO = 1
WEEK_AGO = 7
MONTH_AGO = 31
YEAR_AGO = 365

EST_HOURS_AHEAD = 3

DATE_FORMAT = '%Y-%m-%d'
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

stock_api = Blueprint('stock_api', __name__)

@stock_api.errorhandler(400)
@stock_api.errorhandler(404)
def malformed_request(error):
   if isinstance(error, BadRequest):
      return 'Request was formed incorrectly. ' + \
         'Valid lengths are day, week, month, year.', 400
   elif isinstance(error, NotFound):
      log.error(error)
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
   startTime = time.time()
   raw_response = requests.get(alphaVantageApi + urlencode(queryParams))
   response = raw_response.json()
   alphaTime = time.time() - startTime

   log.info('API hitting: ' + alphaVantageApi + urlencode(queryParams))

   if response.get('Error Message'):
      abort(404)

   data = formatData(response, interval, length)
   parseTime = time.time() - startTime

   log.info('Alphavantage time is: ' + str(alphaTime))
   log.info('Parsing data time is: ' + str(parseTime))
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


def getStartTime(timeDelta):
   today = datetime.now()
   pastDate = today - timedelta(days=timeDelta)
   log.debug(str(pastDate))
   startTime = pastDate.replace(hour=8)
   log.debug(str(startTime))
   return startTime


def formatData(jsonData, interval, length):
   if not interval:
      interval = 'Daily'

   timeSeriesData = jsonData['Time Series (' + interval + ')']

   slicedTimeSeriesData = []

   if length == 'day':
      startTime = getStartTime(getLastWeekdayDelta())
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, startTime, DATETIME_FORMAT)
   
   elif length == 'week':
      startTime = getStartTime(WEEK_AGO)
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, startTime, DATETIME_FORMAT)
   
   elif length == 'month':
      startTime = getStartTime(MONTH_AGO)
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, startTime, DATE_FORMAT)
   
   elif length == 'year':
      startTime = getStartTime(YEAR_AGO)
      slicedTimeSeriesData = formatDataInRange(timeSeriesData, startTime, DATE_FORMAT)
   
   else:
      raise Exception('Invalid length provided')

   return slicedTimeSeriesData


def getLastWeekdayDelta():
   today = date.today()
   if date.today().weekday() <= 4:
      return TODAY
   else:
      daysAgo = 1
      dayBefore = today - timedelta(days=daysAgo)
      while dayBefore.weekday() > 4:
         daysAgo += 1
         dayBefore -= timedelta(days=daysAgo)

      return daysAgo


def formatDataInRange(timeSeriesData, startTime, dateFormat):
   slicedTimeSeriesData = []

   for (key, value) in timeSeriesData.items():
      keyTime = datetime.strptime(key, dateFormat)
      epochTimeEst = keyTime + timedelta(hours=3)

      if startTime < keyTime:
         slicedTimeSeriesData.append({
            'time' : key,
            'epochTime' : keyTime.timestamp(),
            'price' : value['1. open']
         })

   slicedTimeSeriesData.sort(key=lambda item:item['epochTime'], reverse=False)
   return slicedTimeSeriesData
