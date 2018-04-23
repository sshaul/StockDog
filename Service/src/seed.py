from flask import Blueprint, Response, g
from util import logger
import pymysql
import dbConn

log = logger.Logger(True, True, True)

seed_api = Blueprint('seed_api', __name__)

@seed_api.route('/api/seed', methods=['POST'])
def post_seed():
   insertUser("Nish", "Dara", "nish.dara@gmail.com", "nishdarapass")
   insertUser("Ash", "Newman", "ash.newman@gmail.com", "ashnewmanpass")
   insertUser("Sig", "Sigal", "sig.shaul@gmail.com", "sigshaulpass")
   insertUser("Sal", "Onee", "sal.onee@gmail.com", "salOneepass")

   insertPortfolio("PennyStockLyfe", 5000, 1)
   insertPortfolio("TechalltheWay", 3000, 1)
   insertPortfolio("cryptogang", 4000, 2)
   insertPortfolio("novice", 100, 3)

   insertPortfolioHistory(1, "2018-02-18", 5000)
   insertPortfolioHistory(1, "2018-02-19", 4978)
   insertPortfolioHistory(1, "2018-02-20", 4931)
   insertPortfolioHistory(1, "2018-02-21", 4940)
   insertPortfolioHistory(1, "2018-02-22", 4969)
   insertPortfolioHistory(1, "2018-02-23", 5002)
   insertPortfolioHistory(1, "2018-02-24", 5010)
   insertPortfolioHistory(1, "2018-02-25", 5050)
   insertPortfolioHistory(1, "2018-02-26", 5010)
   insertPortfolioHistory(1, "2018-02-27", 5230)
   insertPortfolioHistory(1, "2018-02-28", 5203)
   insertPortfolioHistory(2, "2018-02-23", 3000)
   insertPortfolioHistory(2, "2018-02-24", 3030)
   insertPortfolioHistory(2, "2018-02-25", 3020)
   insertPortfolioHistory(2, "2018-02-26", 3102)
   insertPortfolioHistory(2, "2018-02-27", 3023)
   insertPortfolioHistory(2, "2018-02-28", 2973)

   insertTransaction(41, 5, 1, "2018-02-24", 1, "ROKU", 1)
   insertTransaction(12, 100, 1, "2018-02-25", 1, "AMD", 2)
   insertTransaction(1, 320, 1, "2018-02-26", 1, "TEAR", 1)
   insertTransaction(41, 2, 0, "2018-02-27", 1, "ROKU", 2)
   insertTransaction(0.5, 220, 0, "2018-02-28", 1, "TEAR", 1)
   insertTransaction(334, 3, 1, "2018-02-25", 2, "TSLA", 2)
   insertTransaction(90, 3, 1, "2018-02-27", 2, "MSFT", 1)
   insertTransaction(80, 3, 1, "2018-02-28", 2, "MSFT", 2)
   insertTransaction(94, 3, 0, "2018-02-28", 2, "MSFT", 1)
   insertTransaction(160, 3, 1, "2018-02-25", 3, "AAPL", 2)
   insertTransaction(152, 3, 0, "2018-02-27", 3, "AAPL", 1)
   insertTransaction(3, 23, 1, "2018-02-25", 4, "ADMP", 2)

   insertPortfolioItem(100, 1.86, 1, "PLUG")
   insertPortfolioItem(25, 43, 1, "MU")
   insertPortfolioItem(10, 7, 1, "HMNY")
   insertPortfolioItem(40, 20, 1, "TWTR")
   insertPortfolioItem(6, 1020, 1, "AMZN")
   insertPortfolioItem(18, 130, 2, "INTU")
   insertPortfolioItem(7, 180, 2, "COST")
   insertPortfolioItem(40, 6, 2, "TTS")
   insertPortfolioItem(16, 20, 2, "SNAP")
   insertPortfolioItem(1, 230, 3, "NVDA")
   insertPortfolioItem(10, 44, 3, "MU")

   insertWatchlistItem(1, "PLUG")
   insertWatchlistItem(1, "AAPL")
   insertWatchlistItem(1, "SNAP")
   insertWatchlistItem(1, "SPOT")
   insertWatchlistItem(1, "NFLX")
   insertWatchlistItem(1, "NVDA")
   insertWatchlistItem(1, "MU")
   insertWatchlistItem(1, "TTS")
   insertWatchlistItem(2, "INTU")
   insertWatchlistItem(2, "COST")
   insertWatchlistItem(2, "TEAR")
   insertWatchlistItem(2, "TWTR")
   insertWatchlistItem(2, "BABA")
   insertWatchlistItem(2, "BTC")
   insertWatchlistItem(3, "BTC")
   insertWatchlistItem(3, "LTC")
   insertWatchlistItem(3, "RPL")
   insertWatchlistItem(3, "ETH")

   return Response(status=200)


def insertUser(first, last, email, password):
   g.cursor.execute("INSERT INTO User(firstName, lastName, email, password) VALUES (%s, %s, %s, %s)",
      [first, last, email, password])


def insertPortfolio(name, buyPower, userId, leagueId=1):
   g.cursor.execute("INSERT INTO Portfolio(name, buyPower, userId, leagueId) VALUES (%s, %s, %s, %s)", 
      [name, buyPower, userId, leagueId])


def insertPortfolioHistory(portfolioId, day, value):
   g.cursor.execute("INSERT INTO PortfolioHistory(portfolioId, day, value) VALUES (%s, %s, %s)",
      [portfolioId, day, value])


def insertTransaction(sharePrice, shareCount, isBuy, day, portfolioId, ticker, leagueId):
   g.cursor.execute("INSERT INTO Transaction(sharePrice, shareCount, isBuy, datetime, portfolioId, ticker, leagueId) " +
      "VALUES (%s, %s, %s, %s, %s, %s, %s)",
      [sharePrice, shareCount, isBuy, day, portfolioId, ticker, leagueId])


def insertPortfolioItem(shareCount, avgCost, portfolioId, ticker):
   g.cursor.execute("INSERT INTO PortfolioItem(shareCount, avgCost, portfolioId, ticker) " +
         "VALUES (%s, %s, %s, %s)",
         [shareCount, avgCost, portfolioId, ticker])
   

def insertWatchlistItem(portfolioId, ticker):
   g.cursor.execute("INSERT INTO Watchlist(portfolioId, ticker) VALUES (%s, %s)",
      [portfolioId, ticker])
