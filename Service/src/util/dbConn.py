import simplejson as json
import pymysql

CONFIG_FILE_PATH = '../db/config.json'

def getDBConn():
   try:
      configFile = open(CONFIG_FILE_PATH, 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      raise Exception('The filename was not provided or poorly formatted') 

   conn = pymysql.connect(host='127.0.0.1', user=config['user'], password=config['password'], 
      database=config['database'], cursorclass=pymysql.cursors.DictCursor, autocommit=True)

   return conn
