from flask import Blueprint, abort

from flask import Flask
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask import jsonify
from util import logger
import pymysql
from app import app

login_api = Blueprint('login_api', __name__)
#log = logger.Logger(True, True, True)
#can this be defined twice
#flask login


login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id):
        self.id = id
        self.name = "user" + str(id)
        self.password = self.name + "_secret"

    def __repr__(self):
        return "%d/%s/%s" % (self.id, self.name, self.password)



@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


