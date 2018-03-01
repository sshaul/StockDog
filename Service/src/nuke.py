from flask import Blueprint, request, Response
from util import logger
import pymysql
import dbConn

log = logger.Logger(True, True, True)

nuke_api = Blueprint('nuke_api', __name__)

@nuke_api.route('/api/nuke', methods=['POST'])
def post_nuke():
   body = request.get_json()
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   delete_tables(cursor, ['PortfolioItem', 'PortfolioHistory', 'Watchlist', 'Transaction', 
      'Ticker', 'Portfolio', 'User'], body['resetIncrement'])

   conn.commit()
   return Response(status=200)

def delete_tables(cursor, tables, resetIncrement):
   for table in tables:
      cursor.execute("DELETE FROM " + table)
      if resetIncrement:
         cursor.execute("ALTER TABLE " + table + " AUTO_INCREMENT=1")