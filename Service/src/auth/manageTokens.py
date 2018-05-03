from flask import Flask, Response, g
import random


def generateToken():
   return  '%064x' % random.randrange(16**64)


def isTokenUnique(token):
   g.cursor.execute("SELECT * FROM User WHERE token = %s", token)
   return False if g.cursor.rowcount > 0 else True


def getUniqueToken():
   token = generateToken()
   while not isTokenUnique(token):
      token = generateToken()

   return token


def addTokenToUser(userId):
   token = getUniqueToken()
   
   g.cursor.execute("UPDATE User SET token = %s WHERE id = %s", [token, userId])

   return token