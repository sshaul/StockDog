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


@league_api.route('/api/league/<inviteCode>', methods=['GET'])
def get_leagueToJoin(inviteCode):
    #body = request.get_json()
    
    g.cursor.execute("SELECT * FROM League WHERE inviteCode = %s", inviteCode)
    leagueInfo = g.cursor.fetchone()

    if leagueInfo:
        return jsonify(id=leagueInfo['id'], name=leagueInfo['name'], start=leagueInfo['start']
        end=leagueInfo['end'], startPos=leagueInfo['startPos'], ownerId=leagueInfo['ownerId'])
    else:
        return Response("No league exists with that invite code", status=400)

@league_api.route('/api/league/info/<id>', methods=['GET'])
def get_leagueInfoById(id):

    g.cursor.execute("SELECT * FROM League WHERE id = %s", id)
    leagueInfo = g.cursor.fetchone()

    if leagueInfo:
        return jsonify(name=leagueInfo['name'], start=leagueInfo['start'], end=leagueInfo['end']
        startPos=leagueInfo['startPos'], inviteCode=leagueInfo['inviteCode'], ownerId=leagueInfo['ownerId'])
    else:
        return Response("No league with that id exists", status=400)

'''@league_api.route('/api/league/members/<id>', methods=['GET'])
def get_leagueMembers(id):

    g.cursor.execute("SELECT * FROM portfolio and league where portfolio.leagueId = league.id and league.id = %d", id)
    leagueMembers = g.cursor.fetchall()

    if leagueMembers:
        return json.dumps(leagueMembers)
    else:
        return Response("no members in this league")'''
        

    
