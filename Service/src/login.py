from flask import Flask
from util import logger
from flask import Blueprint, abort
from flask import make_response, request
from flask import jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
import json
import os.path
import sys


log = logger.Logger(True, True, True)
class Login:

    #represents blueprint of login api
    login_api = Blueprint('login_api', __name__)

    def __init__(self, app):
        self.app = app
        login_manager = LoginManager()
        login_manager.init_app(app)

    @login_api.route('/register', methods=["POST"])
    def createAccount():
        data = request.get_json()
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        password = generate_password_hash(data['password'])

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
        dbConnection.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
              (firstName, lastName, email, password));
        conn.commit();
        return "{}"

    @login_api.route('/user/login', methods = ['POST'])
    def login():
        data = request.get_json()
        email = data['email']
        userPass = data['password']
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

        try:
            dbConnection.execute("SELECT password FROM User WHERE email = %s", email)
        except Exception as e:
            log.error("query couldn't be made")
        #use 0 to get the individual value because tuples returned from dbConnection.execute
        password = dbConnection.fetchone()[0]
        if password == 0:
            log.error("no such user exists")
        else:
            if check_password_hash(password, userPass):
                dbConnection.execute("SELECT id FROM User WHERE password = %s", password)
                id = dbConnection.fetchone()[0]
                userId = {'userId': id}
                return json.dumps(userId)
            else:
                log.error("password is incorrect")
                return ""


    #logout functionality
    def logout():
        logout_user()




