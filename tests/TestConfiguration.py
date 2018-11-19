import requests
import simplejson
from unittest import TestCase
import sys

sys.path.append('../')
from Service.src.util.logger import Logger
from Service.src.util.db_connection import getDBConn

TRAVIS_ENV = 'travis'
TRAVIS_URL = "http://0.0.0.0:5005/api"

LOCAL_ENV = 'local'
LOCAL_URL = 'http://localhost:5005/api'

class TestConfiguration(TestCase):

   @classmethod
   def setUpClass(cls):
      cls.log = Logger(True, True, True)
      try:
         cls.db = getDBConn(TRAVIS_ENV)
         cls.cursor = cls.db.cursor()
      except Exception as e:
         cls.log.error(e)
         raise e

      cls.headers = {'content-type' : 'application/json'}
      cls.baseUrl = TRAVIS_URL

   
   def getJson(cls, res):
      try:
         return res.json()
      except simplejson.errors.JSONDecodeError as e:
         return None

   
   @classmethod
   def tearDownClass(cls):
      tables = ['User']
      for table in tables:
         cls.cursor.execute("DELETE FROM " + table)
         cls.cursor.execute("ALTER TABLE " + table + " AUTO_INCREMENT=1")

      if getattr(cls, 'db', None) is not None:
         cls.db.close()
      