from flask import Blueprint, request, Response, g
from werkzeug.security import generate_password_hash, check_password_hash

from util import logger

log = logger.Logger(True, True, True)

user_api = Blueprint('user_api', __name__)


@user_api.route('/api/user', methods=['POST'])
def post_user():
   body = request.get_json()
   passHash = generate_password_hash(body['password'])

   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      (body['firstName'], body['lastName'], body['email'], passHash))

   return Response(status=200)
