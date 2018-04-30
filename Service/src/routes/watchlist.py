from flask import Blueprint, request, Response, g
import simplejson as json

from util import logger

log = logger.Logger(True, True, True)

watchlist_api = Blueprint('watchlist_api', __name__)


@watchlist_api.route('/api/watchlist', methods=['POST'])
def post_watchlist():
   body = request.get_json()

   g.cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s AND ticker = %s",
      [body['portfolioId'], body['ticker']])

   watchlistItem = g.cursor.fetchone()
   if watchlistItem:
      return Response(body['ticker'] + ' already exists in the watchlist of portfolio', status=400)

   g.cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [body['portfolioId'], body['ticker']])

   return Response(status=200)


@watchlist_api.route('/api/watchlist', methods=['GET'])
def get_watchlists():
   portfolioId = request.args.get('portfolioId')

   if portfolioId is not None:
      g.cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s", portfolioId)
   else:
      g.cursor.execute("SELECT * FROM Watchlist")

   watchlists = g.cursor.fetchall()
   return json.dumps(watchlists)


@watchlist_api.route('/api/watchlist/<watchlistId>', methods=['DELETE'])
def del_watchlist(watchlistId):

   g.cursor.execute("DELETE FROM Watchlist WHERE id = %s", watchlistId)

   return Response(status=200)
