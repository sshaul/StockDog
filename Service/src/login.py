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
        password = data['password']

        #if os.path.exists("credentials.json"):
        try:
            credentialsFile = open("credentials.json", "r")
            credentials = json.load(credentialsFile)
            db_username = credentials['username']
            db_password = credentials['password']
        #else:
        except Exception as e:
            log.write("credentials file doesn't exist")
            sys.exit(1)

        conn = pymysql.connect(user=db_username, password=db_password, database="Stockdog")
        # used to execute queries
        dbConnection = conn.cursor()

        dbConnection.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
                  (firstName, lastName, email, password));
        conn.commit();
        return ""
    # login
     #@app.route('/user/login', methods = ['POST'])
     #def login():





