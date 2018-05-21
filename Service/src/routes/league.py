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
   inviteCode = request.args.get('invite')

   if inviteCode:
      g.cursor.execute("SELECT * FROM League WHERE inviteCode = %s", inviteCode)
   else:
      g.cursor.exeucute("SELECT * FROM League")

   leagues = g.cursor.fetchall()
   return json.dumps(leagues, default=Utility.dateToStr)


@league_api.route('/api/league/<id>', methods=['GET'])
def get_league(id):
    g.cursor.execute("SELECT * FROM League WHERE id = %s", id)
    leagueInfo = g.cursor.fetchone()

    if leagueInfo:
        return json.dumps(leagueInfo, default=Utility.dateToStr)
    else:
        return Response("No league with that id exists", status=400)


@league_api.route('/api/league/<id>/members', methods=['GET'])
def get_league_members(id):

    g.cursor.execute("SELECT portfolio.name FROM portfolio, league where portfolio.leagueId = league.id and league.id = %s", id)
    leagueMembers = g.cursor.fetchall()

    if leagueMembers:
        return json.dumps(leagueMembers)
    else:
        return Response("no members in this league")
        

    
