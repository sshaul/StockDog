from flask import Blueprint, request, Response, g
import simplejson as json

from util.utility import Utility

transaction_api = Blueprint('transaction_api', __name__)


@transaction_api.route('/api/transaction', methods=['GET'])
def get_transactions():
   portfolioId = request.args.get('portfolioId')
   leagueId = request.args.get('leagueId')

   if portfolioId:
      g.cursor.execute("SELECT * FROM Transaction WHERE portfolioId = %s", portfolioId)
   else:
      if leagueId:
         g.cursor.execute("SELECT * FROM Transaction WHERE leagueId = %s", leagueId)
      else:
         g.cursor.execute("SELECT * FROM Transaction")

   transactions = g.cursor.fetchall()
   return json.dumps(transactions, default=Utility.dateToStr)
