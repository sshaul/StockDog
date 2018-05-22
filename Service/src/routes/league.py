from flask import Blueprint, request, Response, g, jsonify
import simplejson as json
import time

import routes.portfolio
from util.utility import Utility

league_api = Blueprint('league_api', __name__)

DATE_FORMAT = "%m-%d-%Y"


@league_api.route('/api/league', methods=['POST'])
def post_league():
   body = request.get_json()
   inviteCode = Utility.gen_inviteCode()

   try:
      start = time.strptime(body['start'], DATE_FORMAT)
      end = time.strptime(body['end'], DATE_FORMAT)
   except:
      return Response('Invalid date format. Please use MM-DD-YYYY.', status=400)

   g.cursor.execute("INSERT INTO League(name, start, end, startPos, inviteCode, ownerId) " + 
      "VALUES (%s, %s, %s, %s, %s, %s)",
      [body['name'], start, end, body['startPos'], inviteCode, body['ownerId']])

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
def get_league(leagueId):
   g.cursor.execute("SELECT * FROM League WHERE id = %s", leagueId)
   leagueInfo = g.cursor.fetchone()

   if leagueInfo:
      return json.dumps(leagueInfo, default=Utility.dateToStr)
   else:
      return Response(status=404)


@league_api.route('/api/league/<id>/members', methods=['GET'])
def get_league_members(leagueId):
   g.cursor.execute("SELECT p.name, p.id FROM Portfolio AS p JOIN League l ON p.leagueId = l.id " +
      "WHERE l.id = %s", leagueId)

   members = g.cursor.fetchall()
   membersWithPortfolioValue = portfolio.add_portfolio_value(members)

   json.dumps(membersWithPortfolioValue)
        

    
