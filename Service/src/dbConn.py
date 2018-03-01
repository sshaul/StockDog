import simplejson as json
import pymysql

def getDBConn():
   try:
      configFile = open('credentials.json', 'r')
      config = json.load(configFile)
      configFile.close()
   except Exception as e:
      raise Exception('The filename was not provided or poorly formatted') 

   conn = pymysql.connect(user=config['username'], password=config['password'], database='StockDog',
      cursorclass=pymysql.cursors.DictCursor)

   return conn