from flask import Blueprint, Response
from util import logger
import pymysql
import dbConn

log = logger.Logger(True, True, True)

nuke_api = Blueprint('nuke_api', __name__)

@nuke_api.route('/api/nuke', methods=['POST'])
def post_nuke():
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("DELETE FROM PortfolioItem")
   cursor.execute("DELETE FROM PortfolioHistory")
   cursor.execute("DELETE FROM Watchlist")
   cursor.execute("DELETE FROM Transaction")
   cursor.execute("DELETE FROM Ticker")
   cursor.execute("DELETE FROM Portfolio")
   cursor.execute("DELETE FROM User")

   conn.commit()
   return Response(status=200)