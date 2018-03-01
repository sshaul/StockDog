from flask import Flask, Response
from util import logger
import pymysql
import json
import sys
import tokenize
import random
import dbConn

log = logger.Logger(True, True, True)

def generateToken():
   return  '%064x' % random.randrange(16**64)


def isTokenUnique(cursor, token):
   cursor.execute("SELECT * FROM User WHERE token = %s", token)
   return False if cursor.rowcount > 0 else True


def getUniqueToken(cursor):
   token = generateToken()
   while not isTokenUnique(cursor, token):
      token = generateToken()

   return token


def addTokenToUser(userId):
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      raise Exception(e)

   token = getUniqueToken(cursor)
   cursor.execute("UPDATE User SET token = %s WHERE id = %s", [token, userId])
   conn.commit()

   return token