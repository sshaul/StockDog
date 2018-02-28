from flask import Flask
from util import logger
import pymysql
import json
import sys
import tokenize
import random

log = logger.Logger(True, True, True)

def generateToken():
    return  '%064x' % random.randrange(16**64)

def addTokenToUser(userId):
    token = generateToken()
    try:
        credentialsFile = open("credentials.json", "r")
        credentials = json.load(credentialsFile)
        db_username = credentials['username']
        db_password = credentials['password']
    except Exception as e:
        log.error("credentials file doesn't exist")
        sys.exit(1)

    conn = pymysql.connect(user=db_username, password=db_password, database="Stockdog")
    dbConnection = conn.cursor()

    dbConnection.execute("SELECT token FROM User WHERE token = %s", token)
    tokenExists = dbConnection.rowcount
    if tokenExists != 0:
        while tokenExists != 0:
            token = generateToken()
            dbConnection.execute("SELECT token FROM User WHERE token = %s", token)
            tokenExists = dbConnection.rowcount
    updateQuery = "UPDATE User SET token = %s WHERE id = %s"
    updateData = (token, userId)
    dbConnection.execute(updateQuery, updateData)
    conn.commit()
    return token
