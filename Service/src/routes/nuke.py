from flask import Blueprint, request, Response, g

nuke_api = Blueprint('nuke_api', __name__)


@nuke_api.route('/api/nuke', methods=['DELETE'])
def post_nuke():
   body = request.get_json()

   delete_tables(['League', 'PortfolioItem', 'PortfolioHistory', 'Watchlist', 'Transaction', 
      'Ticker', 'Portfolio', 'User'], body['resetIncrement'])

   return Response(status=200)


def delete_tables(tables, resetIncrement):
   for table in tables:
      g.cursor.execute("DELETE FROM " + table)
      if resetIncrement:
         g.cursor.execute("ALTER TABLE " + table + " AUTO_INCREMENT=1")