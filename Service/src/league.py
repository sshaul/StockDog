from flask import Blueprint, request, Response
from util import logger
from datetime import datetime
import pymysql
import simplejson as json
import dbConn
import random
import string

log = logger.Logger(True, True, True)

league_api = Blueprint('league_api', __name__)

@league_api.route('/api/league', methods=['POST'])
def post_league():
   body = request.get_json()
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   inviteCode = gen_inviteCode()

   cursor.execute("INSERT INTO League(name, start, end, startPos, inviteCode, ownerId) VALUES (%s, %s, %s, %s, %s, %s)",
      [body['name'], body['start'], body['end'], body['startPos'], inviteCode, body['ownerId']])

   conn.commit()
   return json.dumps(inviteCode)


def gen_inviteCode():
   code = random.sample(string.ascii_uppercase + string.digits, 6)
   return ''.join(code)


@league_api.route('/api/league', methods=['GET'])
def get_leagues():
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   cursor.execute("SELECT * FROM League")

   leagues = cursor.fetchall()
   return json.dumps(leagues, default=dateToStr)


def dateToStr(obj):
   if isinstance(obj, datetime):
      return obj.__str__()