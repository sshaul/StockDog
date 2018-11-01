from flask import g, jsonify, make_response, request
from functools import wraps

from util.error_map import errors


def login_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
      try: 
         authToken = request.headers.get('Authorization').split(' ')[1]
         g.cursor.execute("SELECT * FROM User WHERE token = %s", authToken)
         g.user = g.cursor.fetchone()
         if g.user is None:
            raise Exception('Invalid token')
         return f(*args, **kwargs)
      except:
         return make_response(jsonify(NotLoggedIn=errors['notLoggedIn']),401)

   return decorator