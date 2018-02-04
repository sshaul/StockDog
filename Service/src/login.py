from flask import Blueprint, abort

from flask import Flask
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask import jsonify
from util import logger
import pymysql


log = logger.Logger(True, True, True)

login_api = Blueprint('login_api', __name__)

login_manager = LoginManager()
#login_manager.init_app(app)

