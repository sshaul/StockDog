from flask import Blueprint, request, Response, jsonify, g, make_response
from flask_login import LoginManager
from marshmallow import ValidationError
import simplejson as json
from werkzeug.security import generate_password_hash, check_password_hash

from auth import manageTokens
from util.errMap import errors


class Login:

   login_api = Blueprint('login_api', __name__)

   def __init__(self, app):
      self.app = app
      login_manager = LoginManager()
      login_manager.init_app(app)


   @login_api.route('/api/login', methods=['POST'])
   def post_login():
      body = request.get_json()
      try:
         result = LoginSchema().load(body)
      except ValidationError as err:
         return make_response(json.dumps(err.messages), 400)

      g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
      user = g.cursor.fetchone()

      if user:
         passHash = user['password']
         
         if check_password_hash(passHash, body['password']):
            token = manageTokens.addTokenToUser(user['id'])
            return jsonify(userId=user['id'], token=token)
         
         else:
            return make_response(jsonify(error=errors['passwordMismatch']), 401)
      
      else:
         return make_response(jsonify(error=errors['nonexistentUser']), 401)

