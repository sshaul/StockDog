from flask import Blueprint, request, Response, g
import dbConn
from util import logger


logout_api = Blueprint('logout_api', __name__)
log = logger.Logger(True, True, True)

@logout_api.route('/api/logout', methods=['DELETE'])
def logout_user():
    body = request.get_json()

    g.cursor.execute('UPDATE USER SET token = NULL where id = %s', body['userId'])

    return Response(status=200)