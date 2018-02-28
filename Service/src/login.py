from flask import Flask
from util import logger
from flask import Blueprint, abort, Response
from flask import request
from flask import jsonify
from flask_login import LoginManager, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
import pymysql
import json
import sys
import manageTokens


log = logger.Logger(True, True, True)
class Login:

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
        return json.dumps({}), 200

    @login_api.route('/user/login', methods = ['POST'])
    def login():
        data = request.get_json()
        errorMessage = {}
        email = data['email']
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
        checkPassword = dbConnection.rowcount

        if checkPassword == 0:
            errorMessage['message'] = 'Username does not exist.'
            return json.dumps(errorMessage), 401;
        else:
            password = dbConnection.fetchone()[0]
            userPass = data['password']
            if check_password_hash(password, userPass):
                dbConnection.execute("SELECT id FROM User WHERE password = %s", password)
                id = dbConnection.fetchone()[0]
                token = manageTokens.addTokenToUser(id)
                userInfo = {'userId': int(id), 'token': token}
                return json.dumps(userInfo), 200
            else:
                errorMessage['message'] = 'Password is incorrect.'
                return json.dumps(errorMessage), 401;

    #@login_api.route('/user/logout/<token>', methods=['DELETE'])
    #def logout(token):
    #    logout_user()




