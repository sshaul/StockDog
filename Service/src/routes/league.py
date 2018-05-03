from flask import Blueprint, request, Response, g, jsonify
import simplejson as json

from util.utility import Utility

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


@league_api.route('/api/league/join', methods=['POST'])
def get_leagueToJoin():
    body = request.get_json()

    g.cursor.execute("SELECT * FROM League WHERE inviteCode = %s", body['inviteCode'])
    leagueInfo = g.cursor.fetchone()

    if leagueInfo:
        return jsonify(id=leagueInfo['id'], name=leagueInfo['name'])
    else:
        return Response("No league exists with that invite code", status=400)



    
