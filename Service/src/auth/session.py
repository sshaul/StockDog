from flask import Blueprint, request, Response, jsonify, g

session_api = Blueprint('session_api', __name__)


@session_api.route('/api/session/validation', methods=['POST'])
def validateSession():
  body = request.get_json()

  g.cursor.execute("SELECT token FROM User WHERE id = %s", body['userId'])
  row = g.cursor.fetchone()

  if row is None:
    return Response('User does not exist.', status=404)
  
  else:
    if row['token'] is None:
      return Response('User is not logged in.', status=400)
    
    else:    
      if row['token'] == body['token']:
        return Response(status=200)
    
      else:
        return Response(status=401)
