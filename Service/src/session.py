from flask import Blueprint, request, Response, jsonify
from util import logger
import pymysql
import json
import dbConn

session_api = Blueprint('session_api', __name__)
log = logger.Logger(True, True, True)

@session_api.route('/session/validation', methods=['POST'])
def validateSession():
    data = request.get_json()
    id = data['userId']
    token = data['token']
    try:
        conn = dbConn.getDBConn()
        dbConnection = conn.cursor()
    except Exception as e:
        return Response('Failed to make connection to database', status=500)

    dbConnection.execute("SELECT token FROM User WHERE id = %s", id)
    res = dbConnection.fetchone()
    if res == 0:
        error = {'valid': 'false', 'message': 'User is not logged in.'}
        return json.dumps(error), 401
    else:
       result = res['token']
       if result != token:
           error = {'valid': 'false', 'message': 'Wrong token'}
           return json.dumps(error), 401
       else:
           valid = {'valid': 'true'}
           return json.dumps(valid), 200
