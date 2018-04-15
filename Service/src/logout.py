from flask import Blueprint, request, Response
import dbConn
from util import logger


logout_api = Blueprint('logout_api', __name__)
log = logger.Logger(True, True, True)

@logout_api.route('/api/logout', methods=['DELETE'])
def logout_user():
    body = request.get_json()
    try:
        conn = dbConn.getDBConn()
        cursor = conn.cursor()
    except Exception as e:
        return Response('Failed to make connection to database', status=500)

    try:
        cursor.execute('UPDATE USER SET token = NULL where id = %s', body['userId'])
    except Exception as e:
       return Response('Failed to execute query', status=500)

    conn.commit()
    cursor.execute('SELECT token from USER WHERE id = %s', body['userId'])
    userInfo = cursor.fetchone()
    if (userInfo['token'] == None):
        return Response('Removed token and user has been logged out', status=200)
    else:
        return Response('Failed to remove token', status=500)
