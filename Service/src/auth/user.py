from flask import Blueprint, request, Response, g, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import simplejson as json

from request_validator import validator
from request_validator.schemas import user_schema, login_schema
from .token_manager import getUniqueToken
from util.error_map import errors

user_api = Blueprint('user_api', __name__)

@user_api.route('/api/users', methods=['POST'])
@validator.validate_body(user_schema.fields)
def post_user():
   body = request.get_json()

   g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
   sameEmailusers = g.cursor.fetchall()
   if len(sameEmailusers) > 0:
      return make_response(jsonify(DuplicateEmail=errors['duplicateEmail']), 400)

   passwordHash = generate_password_hash(body['password'])

   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      (body['firstName'], body['lastName'], body['email'], passwordHash))
   
   return Response(status=200)


@user_api.route('/api/users/sessions', methods=['POST'])
@validator.validate_body(login_schema.fields)
def login_user():
   body = request.get_json()

   g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
   user = g.cursor.fetchone()

   if user:
      passHash = user['password']

      if check_password_hash(passHash, body['password']):
         token = getUniqueToken()
         g.cursor.execute("UPDATE User SET token = %s WHERE id = %s", [token, user['id']])
         return jsonify(userId=user['id'], token=token)

      else:
         return make_response(jsonify(PasswordMismatch=errors['passwordMismatch']), 401)
   
   else:
      return make_response(jsonify(NonexistentUser=errors['nonexistentUser']), 401)


@user_api.route('/api/users/<userId>/sessions', methods=['DELETE'])
def logout_user():
   userId = request.args.get('userId')

   g.cursor.execute("UPDATE User SET token = NULL WHERE id = %s", userId)

   return Response(status=200)