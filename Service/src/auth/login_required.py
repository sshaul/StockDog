from functools import wraps
from flask import g, request, redirect, url_for, Response, jsonify,make_response
from util.errMap import errors

def login_required(f):
    @wraps(f)
    def login_decorator(*args, **kwargs):
        auth = request.headers.get('token')
        row = get_token(auth)

        if row is None:
            return make_response(jsonify(error=errors['invalidToken']), 403)
        else:
            g.user = row
            return f(*args, **kwargs)
    return login_decorator        
            
def get_token(auth):
    g.cursor.execute("SELECT * FROM User WHERE token = %s", auth)
    return g.cursor.fetchone()