import pymysql
import os
import simplejson as json

CONFIG_FILE_PATH = 'Service/db/config.json'

def getConfigFilePath():
   cwd = os.getcwd()
   return cwd[:len(cwd) - 7] + CONFIG_FILE_PATH

def getDBConn():
   try:
      configFile = open(getConfigFilePath(), 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      raise Exception('The filename was not provided or poorly formatted') 

   conn = pymysql.connect(host='127.0.0.1', user=config['user'], password=config['password'], 
      database=config['database'], cursorclass=pymysql.cursors.DictCursor, autocommit=True)

   return conn
