from flask import Blueprint, request, Response, g
from auth.login_required import login_required

logout_api = Blueprint('logout_api', __name__)


@logout_api.route('/api/logout', methods=['DELETE'])
@login_required
def logout_user():
   body = request.get_json()

   g.cursor.execute('UPDATE User SET token = NULL where id = %s', body['userId'])

   return Response(status=200)