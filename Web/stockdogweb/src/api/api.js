import axios from 'axios';
import { get, post } from './apiUtils';

// Contains all of the API calls
class API {
   baseURL = 'http://198.199.100.209:5005/api';
   config = {
      "headers": {
         "Content-Type": "application/json"
      }
   };
   urls = {
      portfolio: this.baseURL + '/portfolio',
      stock: this.baseURL + '/stock',
      user: this.baseURL + '/user',
      login: this.baseURL + '/login',
      logout: this.baseURL + '/logout',
      nuke: this.baseURL + '/nuke',
      seed: this.baseURL + '/seed',
      watchlist: this.baseURL + '/watchlist',
      league: this.baseURL + '/league',
      transaction: this.baseURL + '/transaction',
   };

   // Used to get the price history of a particular ticker
   getStockPriceHistory = (ticker, timeFrame) => {
      return new Promise((resolve, reject) => {
         get(`${this.urls["stock"]}/${ticker}/history/$timeFrame`)
            .then(data => {resolve(data)})
            .catch(errorMessage => {reject(errorMessage)})
      });
   }

   // Gets the stock history of a given stock and timeFrame
   // Accepts a callback to do something with the history list
   stockHistory = (ticker, timeFrame) => {
      return new Promise((resolve, reject) => {
         get(`/stock/${ticker}/history/${timeFrame}`)
            .then(response => {resolve(response)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   };

   register = (fname, lname, email, pass, callback) => {
      axios.post(this.urls['user'], {
         "firstName": fname,
         "lastName": lname,
         "email": email,
         "password": pass
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };


   login = (email, password) => {
      return new Promise((resolve, reject) => {
         post('/login', {email, password})
            .then(data => {resolve(data)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   }

   logout = (userId, callback) => {
      axios.delete(this.urls['logout'], {data: {userId}}, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   }

   getAllPortfolios = (userId) => {
      return new Promise((resolve, reject) => {
         get(`/portfolio?userId=${userId}`)
            .then(data => {resolve(data)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   }

   createPortfolio = (userId, name, buyPower, callback) => {
      axios.post(this.urls['portfolio'], {
         userId, name, buyPower
      }, this.config)
         .then((res) => {
            callback(res["data"]);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   createPortfolioWithLeague = (userId, name, buyPower, leagueId, inviteCode,
    callback) => {
      axios.post(this.urls['portfolio'], {
         userId, name, buyPower, leagueId, inviteCode
      }, this.config)
         .then((res) => {
            callback(res);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   getPortfolio = (portfolioId) => {
      return new Promise((resolve, reject) => {
         get(`/portfolio/${portfolioId}`)
            .then(response => {resolve(response)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   };

   getPortfolioValue = (portfolioId, callback) => {
      axios.get(this.urls['portfolio'] + portfolioId + "/value", 
         this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            console.log(err);
         });
   }

   getCachedPortfolioValue = (portfolioId) => {
      return new Promise((resolve, reject) => {
         get(`/portfolio/${portfolioId}/history/now`)
            .then(response => {resolve(response)})
            .catch(errorMessage => {reject(errorMessage)});
      })
   }

   getPortfolioHistory = (portfolioId) => {
      return new Promise((resolve, reject) => {
         get(`/portfolio/${portfolioId}/history`)
            .then(response => {resolve(response)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   }

   buy = (ticker, shareCount, portfolioId, callback) => {
      axios.post(this.urls['stock'] + "buy/" + ticker, {
         shareCount, portfolioId
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   sell = (ticker, shareCount, portfolioId, callback) => {
      axios.post(this.urls['stock'] + "sell/" + ticker, {
         shareCount, portfolioId
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   getWatchlist = (portfolioId) => {
      return new Promise((resolve, reject) => {
         get(`/watchlist?portfolioId=${portfolioId}`)
            .then(response => {resolve(response)})
            .catch(errorMessage => {reject(errorMessage)});
      });
   };

   addToWatchlist = (ticker, portfolioId, callback) => {
      axios.post(this.baseURL + "/watchlist", {
         ticker, portfolioId
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   deleteFromWatchlist = (watchlistId, callback) => {
      axios.delete(this.baseURL + "/watchlist/" + watchlistId, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   createLeague = (name, start, end, buyPower, ownerId, callback) => {
      axios.post(this.baseURL + "/league", {
         name, start, end, startPos: buyPower, ownerId
      }, this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            console.log(err);
         });
   };

   getLeagueIdViaInviteCode = (inviteCode, callback) => {
      axios.get(this.baseURL + "/league?inviteCode=" + inviteCode, this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            callback(null);
         });
   }

   getLeague = (id, callback) => {
      axios.get(this.baseURL + "/league/" + id, this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            console.log(err);
         })
   };

   getLeagueMembers = (id, callback) => {
      axios.get(this.baseURL + "/league/" + id + "/members", this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            console.log(err);
         })
   };

   getLeagueTransactions = (id, callback) => {
      axios.get(this.baseURL + "/transaction?leagueId=" + id, this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            console.log(err);
         })
   }
}

export default API;
