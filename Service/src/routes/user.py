from flask import Blueprint, request, Response, g, jsonify, make_response
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash, check_password_hash
import simplejson as json

from util.errMap import errors

user_api = Blueprint('user_api', __name__)


@user_api.route('/api/user', methods=['POST'])
def post_user():
   body = request.get_json()
   try:
      result = UserSchema().load(body)
   except ValidationError as err:
      return make_response(json.dumps(err.messages), 400)

   g.cursor.execute("SELECT * FROM User WHERE email = %s", body['email'])
   sameEmailUsers = g.cursor.fetchall()
   if len(sameEmailUsers) > 0:
      return make_response(jsonify(error=errors['duplicateEmail']), 400)

   passHash = generate_password_hash(body['password'])

   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      (body['firstName'], body['lastName'], body['email'], passHash))

   return Response(status=200)


@user_api.route('/api/user/<userId>', methods=['GET'])
def get_user(userId):
   g.cursor.execute("SELECT firstName, lastName, email, token FROM User " +
      "WHERE id = %s", userId)

   user = g.cursor.fetchone()
   return json.dumps(user)