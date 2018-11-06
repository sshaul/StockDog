from unittest import TestCase
import sys

sys.path.append('../')
from Service.src.util.logger import Logger
from Service.src.util.db_connection import getDBConn

class TestConfiguration(TestCase):

   @classmethod
   def setUpClass(cls):
      cls.log = Logger(True, True, True)

      try:
         cls.db = getDBConn()
         cls.cursor = cls.db.cursor()
      except Exception as e:
         cls.log.error(e)
         return Response('Failed to make connection to database', status=500)


   @classmethod
   def tearDownClass(cls):
      if getattr(cls, 'db', None) is not None:
         cls.db.close()
      