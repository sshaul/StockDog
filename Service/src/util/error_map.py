import simplejson as json


errors = {
   'unsupportedTicker': 'The stock ticker is either invalid or unsupported.',
   'iexUnavailable': 'Honestly, this probably means that iex is down lol.',
   'invalidDate': 'Invalid date format. Please use MM-DD-YYYY.',
   'nonexistentLeague': 'League does not exist.',
   'inviteCodeMismatch': "Invite code does not match the league's invite code.",
   'missingInviteCode': 'Invite code was not provided to join league.',
   'unsupportedPortfolioGet': 'Please provide only the userId or only the leagueId.',
   'insufficientShares': 'Insufficient shares owned to make sale.',
   'nonexistentPortfolio': 'Portfolio does not exist.',
   'insufficientBuyPower': 'Insufficient buy power to make purchase.',
   'duplicateWatchlistItem': 'Ticker already exists in the watchlist of portfolio.',
   'duplicateEmail': 'User with email already exists.',
   'nonexistentUser': 'User does not exist.',
   'notLoggedIn': 'User must be logged in.',
   'passwordMismatch': 'Incorrect password for user.',
   'alphaVantageDown': 'AlphaVantage failed to respond'
}
