from datetime import datetime
from flask import Blueprint, jsonify, make_response, request, Response, g
import requests
import simplejson as json
import time

from util.error_map import errors

DAY = '1d'
MONTH = '1m'
YEAR = '1y'

IEX_DATETIME_FORMAT = '%Y%m%d %H:%M'
IEX_DATE_FORMAT = '%Y-%m-%d'
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

iex_api = Blueprint('iex_api', __name__)

URL_PREFIX = 'https://api.iextrading.com/1.0/stock/'


@iex_api.route('/api/iex/<ticker>/history/<length>')
def get_history(ticker, length):
   interval = getInterval(length)
   requestUrl = URL_PREFIX + ticker + '/chart/' + interval

   g.log.info('IEX API hitting: ' + requestUrl)
   startTime = time.time()
   rawResponse = requests.get(requestUrl)
   iexTime = time.time() - startTime

   try:
      response = rawResponse.json()
   except:
      return make_response(jsonify(error=errors['unsupportedTicker']), 404)

   data = formatData(response, interval)
   if len(data) == 0:
      return make_response(jsonify(error=errors['iexUnavialable']), 500)
   
   if length == 'now':
      data = data[-1]
   parseTime = time.time() - startTime
   
   g.log.info('IEX time is: ' + str(iexTime))
   g.log.info('Parsing data time is : ' + str(parseTime))

   return json.dumps(data)


def getInterval(length):
   if length == 'now' or length == 'day':
      return DAY
   elif length == 'week' or length == 'month':
      return MONTH
   elif length == 'year':
      return YEAR


def formatData(jsonData, interval):
   if interval == DAY:
      return formatDataIntraday(jsonData)
   elif interval == MONTH or interval == YEAR:
      return formatDataInterDay(jsonData)


def formatDataInterDay(jsonData):
   data = []
   for item in jsonData:

      itemTime = datetime.strptime(item['date'], IEX_DATE_FORMAT)
      data.append({
         'time' : itemTime.strftime(DATETIME_FORMAT),
         'epochTime' : itemTime.timestamp(),
         'price' : item['open']
      })

   data.sort(key=lambda item:item['epochTime'], reverse=False)
   return data


def formatDataIntraday(jsonData):
   data = [] 
   for item in jsonData:
      if item['average'] < 0:
         continue

      itemTime = datetime.strptime(item['date'] + ' ' + item['minute'], IEX_DATETIME_FORMAT)
      data.append({
         'time' : itemTime.strftime(DATETIME_FORMAT),
         'epochTime' : itemTime.timestamp(),
         'price' : item['average']
      })

   data.sort(key=lambda item:item['epochTime'], reverse=False)
   return data

