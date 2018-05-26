from flask import Blueprint, request, Response, jsonify, g

from util.errMap import errors

session_api = Blueprint('session_api', __name__)


@session_api.route('/api/session/validation', methods=['POST'])
def validateSession():
  body = request.get_json()

  g.cursor.execute("SELECT token FROM User WHERE id = %s", body['userId'])
  row = g.cursor.fetchone()

  if row is None:
    return Response(errors['nonexistentUser'], status=404)
  
  else:
      if row['token'] == body['token']:
        return Response(status=200)
      else:
        return Response(status=401)
