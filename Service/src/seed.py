from flask import Blueprint, Response
from util import logger
import pymysql
import dbConn

log = logger.Logger(True, True, True)

seed_api = Blueprint('seed_api', __name__)

@seed_api.route('/api/seed', methods=['POST'])
def post_seed():
   try:
      conn = dbConn.getDBConn()
      cursor = conn.cursor()
   except Exception as e:
      return Response('Failed to make connection to database', status=500)

   insertUser(cursor, "Nish", "Dara", "nish.dara@gmail.com", "nishdarapass")
   insertUser(cursor, "Ash", "Newman", "ash.newman@gmail.com", "ashnewmanpass")
   insertUser(cursor, "Sig", "Sigal", "sig.shaul@gmail.com", "sigshaulpass")
   insertUser(cursor, "Sal", "Onee", "sal.onee@gmail.com", "salOneepass")

   insertPortfolio(cursor, "PennyStockLyfe", 5000, 1)
   insertPortfolio(cursor, "TechalltheWay", 3000, 1)
   insertPortfolio(cursor, "cryptogang", 4000, 2)
   insertPortfolio(cursor, "novice", 100, 3)

   insertPortfolioHistory(cursor, 1, "2018-02-18", 5000)
   insertPortfolioHistory(cursor, 1, "2018-02-19", 4978)
   insertPortfolioHistory(cursor, 1, "2018-02-20", 4931)
   insertPortfolioHistory(cursor, 1, "2018-02-21", 4940)
   insertPortfolioHistory(cursor, 1, "2018-02-22", 4969)
   insertPortfolioHistory(cursor, 1, "2018-02-23", 5002)
   insertPortfolioHistory(cursor, 1, "2018-02-24", 5010)
   insertPortfolioHistory(cursor, 1, "2018-02-25", 5050)
   insertPortfolioHistory(cursor, 1, "2018-02-26", 5010)
   insertPortfolioHistory(cursor, 1, "2018-02-27", 5230)
   insertPortfolioHistory(cursor, 1, "2018-02-28", 5203)
   insertPortfolioHistory(cursor, 2, "2018-02-23", 3000)
   insertPortfolioHistory(cursor, 2, "2018-02-24", 3030)
   insertPortfolioHistory(cursor, 2, "2018-02-25", 3020)
   insertPortfolioHistory(cursor, 2, "2018-02-26", 3102)
   insertPortfolioHistory(cursor, 2, "2018-02-27", 3023)
   insertPortfolioHistory(cursor, 2, "2018-02-28", 2973)

   insertTransaction(cursor, 41, 5, 1, "2018-02-24", 1, "ROKU", 1)
   insertTransaction(cursor, 12, 100, 1, "2018-02-25", 1, "AMD", 2)
   insertTransaction(cursor, 1, 320, 1, "2018-02-26", 1, "TEAR", 1)
   insertTransaction(cursor, 41, 2, 0, "2018-02-27", 1, "ROKU", 2)
   insertTransaction(cursor, 0.5, 220, 0, "2018-02-28", 1, "TEAR", 1)
   insertTransaction(cursor, 334, 3, 1, "2018-02-25", 2, "TSLA", 2)
   insertTransaction(cursor, 90, 3, 1, "2018-02-27", 2, "MSFT", 1)
   insertTransaction(cursor, 80, 3, 1, "2018-02-28", 2, "MSFT", 2)
   insertTransaction(cursor, 94, 3, 0, "2018-02-28", 2, "MSFT", 1)
   insertTransaction(cursor, 160, 3, 1, "2018-02-25", 3, "AAPL", 2)
   insertTransaction(cursor, 152, 3, 0, "2018-02-27", 3, "AAPL", 1)
   insertTransaction(cursor, 3, 23, 1, "2018-02-25", 4, "ADMP", 2)

   insertPortfolioItem(cursor, 100, 1.86, 1, "PLUG")
   insertPortfolioItem(cursor, 25, 43, 1, "MU")
   insertPortfolioItem(cursor, 10, 7, 1, "HMNY")
   insertPortfolioItem(cursor, 40, 20, 1, "TWTR")
   insertPortfolioItem(cursor, 6, 1020, 1, "AMZN")
   insertPortfolioItem(cursor, 18, 130, 2, "INTU")
   insertPortfolioItem(cursor, 7, 180, 2, "COST")
   insertPortfolioItem(cursor, 40, 6, 2, "TTS")
   insertPortfolioItem(cursor, 16, 20, 2, "SNAP")
   insertPortfolioItem(cursor, 1, 230, 3, "NVDA")
   insertPortfolioItem(cursor, 10, 44, 3, "MU")

   insertWatchlistItem(cursor, 1, "PLUG")
   insertWatchlistItem(cursor, 1, "AAPL")
   insertWatchlistItem(cursor, 1, "SNAP")
   insertWatchlistItem(cursor, 1, "SPOT")
   insertWatchlistItem(cursor, 1, "NFLX")
   insertWatchlistItem(cursor, 1, "NVDA")
   insertWatchlistItem(cursor, 1, "MU")
   insertWatchlistItem(cursor, 1, "TTS")
   insertWatchlistItem(cursor, 2, "INTU")
   insertWatchlistItem(cursor, 2, "COST")
   insertWatchlistItem(cursor, 2, "TEAR")
   insertWatchlistItem(cursor, 2, "TWTR")
   insertWatchlistItem(cursor, 2, "BABA")
   insertWatchlistItem(cursor, 2, "BTC")
   insertWatchlistItem(cursor, 3, "BTC")
   insertWatchlistItem(cursor, 3, "LTC")
   insertWatchlistItem(cursor, 3, "RPL")
   insertWatchlistItem(cursor, 3, "ETH")

   conn.commit()
   return Response(status=200)


def insertUser(cursor, first, last, email, password):
   cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      [first, last, email, password])


def insertPortfolio(cursor, name, buyPower, userId, leagueId=1):
   cursor.execute("INSERT INTO Portfolio(name, buyPower, userId, leagueId) VALUES (%s, %s, %s, %s)", 
      [name, buyPower, userId, leagueId])


def insertPortfolioHistory(cursor, portfolioId, day, value):
   cursor.execute("INSERT INTO PortfolioHistory(portfolioId, day, value) VALUES (%s, %s, %s)",
      [portfolioId, day, value])


def insertTransaction(cursor, sharePrice, shareCount, isBuy, day, portfolioId, ticker, leagueId):
   cursor.execute("INSERT INTO Transaction(sharePrice, shareCount, isBuy, datetime, portfolioId, ticker, leagueId) " +
      "VALUES (%s, %s, %s, %s, %s, %s, %s)",
      [sharePrice, shareCount, isBuy, day, portfolioId, ticker, leagueId])


def insertPortfolioItem(cursor, shareCount, avgCost, portfolioId, ticker):
   cursor.execute("INSERT INTO PortfolioItem(shareCount, avgCost, portfolioId, ticker) " +
         "VALUES (%s, %s, %s, %s)",
         [shareCount, avgCost, portfolioId, ticker])
   

def insertWatchlistItem(cursor, portfolioId, ticker):
   cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [portfolioId, ticker])
