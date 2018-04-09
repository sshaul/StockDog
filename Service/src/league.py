from flask import Blueprint, request, Response
from util import logger
from datetime import datetime
import pymysql
import simplejson as json
import dbConn

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

   cursor.execute("INSERT INTO League(name, start, end, startPos) VALUES (%s, %s, %s, %s)",
      [body['name'], body['start'], body['end'], body['startPos']])
   conn.commit()

   return Response(status=200)


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