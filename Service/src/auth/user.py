from flask import Blueprint, request, Response, g, jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import simplejson as jsonify

from request_validator import validator
from request_validator.schemas import user_schema, login_schema
from .token_manager import addTokenToUser
from util.error_map import errors

user_api = Blueprint('user_api', __name__)

@user_api.route('/api/users', methods=['POST'])
@validator.validate_body(user_schema)
def post_user():
   body = request.get_json()
   try:
      validator.validate(body, user_schema.fields)
   except ValidationError as e:
      make_response(json.dumps(e.errors), 400)

   g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
   sameEmailusers = g.cursor.fetchall()
   if len(sameEmailusers > 0):
      return make_response(jsonify(DuplicateEmail=errors['duplicateEmail']), 400)

   passwordHash = generate_password_hash(body['password'])

   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      (body['firstName'], body['lastName'], body['email'], passHash))
   
   return Response(status=200)


@user_api.route('/api/users/<userId>/session', methods=['POST'])
@validator.validate_body(login_schema)
def login_user():
   body = request.get_json()
   try:
      validator.validate(body, login_schema.fields)
   except ValidationError as e:
      make_response(json.dumps(e.errors), 400)

   g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
   user = g.cursor.fetchone()

   if user:
      passHash = user['password']

      if check_password_hash(passHash, body['password']):
         token = addTokenToUser(user['id'])
         return jsonify(userId=user['id'], token=token)

      else:
         return make_response(jsonify(PasswordMismatch=errors['passwordMismatch']), 401)
   
   else:
      return make_response(jsonify(NonexistentUser=errors['nonexistentUser']), 401)


@user_api.route('/api/users/<userId>/session', methods=['DELETE'])
def logout_user():
   userId = request.args.get('userId')

   g.cursor.execute("UPDATE User SET token = NULL WHERE id = %s", userId)

   return Response(status=200)