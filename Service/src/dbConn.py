import simplejson as json
import pymysql


def getDBConn():
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      raise Exception('The filename was not provided or poorly formatted') 

   conn = pymysql.connect(host='127.0.0.1', user=config['username'], password=config['password'], database='Stockdog',
      cursorclass=pymysql.cursors.DictCursor)

   return conn
