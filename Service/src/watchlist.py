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

   cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s AND ticker = %s",
      [body['portfolioId'], body['ticker']])

   watchlistItem = cursor.fetchone()
   if watchlistItem:
      return Response(body['ticker'] + ' already exists in the watchlist of portfolio', status=400)

   cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [body['portfolioId'], body['ticker']])
   conn.commit()

   return Response(status=200)


@watchlist_api.route('/api/watchlist', methods=['GET'])
def get_watchlists():
   portfolioId = request.args.get('portfolioId')
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   if portfolioId is not None:
      cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s", portfolioId)
   else:
      cursor.execute("SELECT * FROM Watchlist")

   watchlists = cursor.fetchall()
   return json.dumps(watchlists)


@watchlist_api.route('/api/watchlist/<watchlistId>', methods=['DELETE'])
def del_watchlist(watchlistId):
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("DELETE FROM Watchlist WHERE id = %s", watchlistId)
   conn.commit()

   return Response(status=200)
