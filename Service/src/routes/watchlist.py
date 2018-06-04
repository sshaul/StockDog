from flask import Blueprint, jsonify, make_response, request, Response, g
import simplejson as json

from util.errMap import errors
from auth.login_required import login_required

watchlist_api = Blueprint('watchlist_api', __name__)


@watchlist_api.route('/api/watchlist', methods=['POST'])
@login_required
def post_watchlist():
   body = request.get_json()

   g.cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s AND ticker = %s",
      [body['portfolioId'], body['ticker']])

   watchlistItem = g.cursor.fetchone()
   if watchlistItem:
      return make_response(jsonify(error=errors['duplicateWatchlistItem']), 400)

   g.cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [body['portfolioId'], body['ticker']])

   return Response(status=200)


@watchlist_api.route('/api/watchlist', methods=['GET'])
@login_required
def get_watchlists():
   portfolioId = request.args.get('portfolioId')

   if portfolioId is not None:
      g.cursor.execute("SELECT * FROM Watchlist WHERE portfolioId = %s", portfolioId)
   else:
      g.cursor.execute("SELECT * FROM Watchlist")

   watchlists = g.cursor.fetchall()
   return json.dumps(watchlists)


@watchlist_api.route('/api/watchlist/<watchlistId>', methods=['DELETE'])
@login_required
def del_watchlist(watchlistId):

   g.cursor.execute("DELETE FROM Watchlist WHERE id = %s", watchlistId)

   return Response(status=200)
