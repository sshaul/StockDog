from flask import g, jsonify, make_response, request, Response
from functools import update_wrapper, wraps

from util.error_map import errors


def login_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
      try: 
         authHeader = request.headers.get('Authorization').split(' ')
         if len(authHeader) != 2 or authHeader[0] != "token":
            raise Exception('Invalid token')
         authToken = authHeader[1]
         g.cursor.execute("SELECT * FROM User WHERE token = %s", authToken)
         g.user = g.cursor.fetchone()
         if g.user is None:
            raise Exception('Invalid token')
      except Exception as e:
         return make_response(jsonify(NotLoggedIn=errors['notLoggedIn']),401)
      
      return f(*args, **kwargs)
      
   return decorator

def session_belongsTo_user(userId):
   return str(g.user['id']) == userId