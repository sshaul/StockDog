from flask import Blueprint, request, Response, g, jsonify
import simplejson as json

from util import logger
from util.utility import Utility

log = logger.Logger(True, True, True)

league_api = Blueprint('league_api', __name__)


@league_api.route('/api/league', methods=['POST'])
def post_league():
   body = request.get_json()
   inviteCode = Utility.gen_inviteCode()

   g.cursor.execute("INSERT INTO League(name, start, end, startPos, inviteCode, ownerId) VALUES (%s, %s, %s, %s, %s, %s)",
      [body['name'], body['start'], body['end'], body['startPos'], inviteCode, body['ownerId']])

   return jsonify(inviteCode=inviteCode, id=g.cursor.lastrowid)


@league_api.route('/api/league', methods=['GET'])
def get_leagues():
   g.cursor.execute("SELECT * FROM League")

   leagues = g.cursor.fetchall()
   return json.dumps(leagues, default=Utility.dateToStr)
