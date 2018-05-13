from flask import Blueprint, request, Response, g
from werkzeug.security import generate_password_hash, check_password_hash
import simplejson as json

user_api = Blueprint('user_api', __name__)


@user_api.route('/api/user', methods=['POST'])
def post_user():
   body = request.get_json()
   passHash = generate_password_hash(body['password'])

   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      (body['firstName'], body['lastName'], body['email'], passHash))

   return Response(status=200)


@user_api.route('/api/user/<userId>', methods=['GET'])
def get_user(userId):
   g.cursor.execute("SELECT * FROM User WHERE id = %s", userId)

   user = g.cursor.fetchone()
   return json.dumps(user)