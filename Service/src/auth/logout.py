from flask import Blueprint, request, Response, g

logout_api = Blueprint('logout_api', __name__)


@logout_api.route('/api/logout', methods=['DELETE'])
def logout_user():
   body = request.get_json()

   g.cursor.execute('UPDATE USER SET token = NULL where id = %s', body['userId'])

   return Response(status=200)