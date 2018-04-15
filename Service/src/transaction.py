from flask import Blueprint, request, Response
from util import logger
from datetime import datetime
import pymysql
import simplejson as json
import dbConn

log = logger.Logger(True, True, True)

transaction_api = Blueprint('transaction_api', __name__)

@transaction_api.route('/api/transaction', methods=['GET'])
def get_transactions():
   portfolioId = request.args.get('portfolioId')
   leagueId = request.args.get('leagueId')
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)


   if portfolioId:
      cursor.execute("SELECT * FROM Transaction WHERE portfolioId = %s", portfolioId)
   else:
      if leagueId:
         cursor.execute("SELECT * FROM Transaction WHERE leagueId = %s", leagueId)
      else:
         cursor.execute("SELECT * FROM Transaction")

   transactions = cursor.fetchall()
   return json.dumps(transactions, default=dateToStr)


def dateToStr(obj):
   if isinstance(obj, datetime):
      return obj.__str__()