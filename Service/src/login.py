from flask import Blueprint, request, Response, jsonify
from flask_login import LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
import dbConn
import manageTokens
from util import logger

log = logger.Logger(True, True, True)

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
         conn = dbConn.getDBConn()
         cursor = conn.cursor()
      except Exception as e:
         return Response('Failed to make connection to database', status=500)

      cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
      user = cursor.fetchone()

      if user:
         passHash = user['password']
         if check_password_hash(passHash, body['password']):
            token = manageTokens.addTokenToUser(user['id'])
            return jsonify(userId=user['id'], token=token)
         else:
            return Response('Incorrect password for user with email ' + body['email'], status=401)
      else:
         return Response('No user with email ' + body['email'] + ' exists', status=401)

