from flask import Blueprint, request, Response
from util import logger
import pymysql
import simplejson as json
import dbConn

log = logger.Logger(True, True, True)

watchlist_api = Blueprint('watchlist_api', __name__)
@watchlist_api.route('/api/watchlist', methods=['POST'])
def post_watchlist():
   body = request.get_json()
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [body['portfolioId'], body['ticker']])
   conn.commit()

   return Response(status=200)