from chai import Chai
from unittest import TestCase
import sys

sys.path.append('../')
from Service.src.util.logger import Logger
from Service.src.util.db_connection import getDBConn

class TestConfiguration(Chai):

   @classmethod
   def setUpClass(cls):
      cls.log = Logger(True, True, True)
      try:
         cls.db = getDBConn()
         cls.cursor = cls.db.cursor()
      except Exception as e:
         cls.log.error(e)
         raise e

      cls.headers = {'content-type' : 'application/json'}
      cls.baseUrl = 'http://localhost:5005/api'

   

   @classmethod
   def tearDownClass(cls):
      tables = ['User']
      for table in tables:
         cls.cursor.execute("DELETE FROM " + table)
         cls.cursor.execute("ALTER TABLE " + table + " AUTO_INCREMENT=1")

      if getattr(cls, 'db', None) is not None:
         cls.db.close()
      