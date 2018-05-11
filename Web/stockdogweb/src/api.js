import axios from 'axios';

// Contains all of the API calls
class API {
   baseURL = 'http://198.199.100.209:5005/api';
   config = {
      "headers": {
         "Content-Type": "application/json"
      }
   };

   // Gets the stock history of a given stock and timeFrame
   // Accepts a callback to do something with the history list
   stockHistory = (ticker, timeFrame, cb) => {
      const url = this.baseURL + '/stock/' + ticker +
                  '/history/' + timeFrame;
      axios.get(url)
         .then((res) => {
            cb(res['data']);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   register = (fname, lname, email, pass, callback) => {
      axios.post(this.baseURL + "/user", {
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

   login = (username, password, callback) => {
      axios.post(this.baseURL + "/login", {
         "email": username,
         "password": password
      }, this.config)
         .then((res) => {
            callback(res["data"]["userId"], res["data"]["token"]);
         })
         .catch((err) => {
            console.log(err);
            alert("Login unsuccessful. Please check username and password.");
         });
   };

   getAllPortfolios = (userId, callback) => {
      axios.get(this.baseURL + "/portfolio?userId=" + userId, this.config)
         .then((res) => {
            callback(res["data"])
         })
         .catch((err) => {
            console.log(err);
         });
   };

   createPortfolio = (userId, name, buyPower, callback) => {
      axios.post(this.baseURL + "/portfolio", {
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
      axios.post(this.baseURL + "/portfolio", {
         userId, name, buyPower, leagueId, inviteCode
      }, this.config)
         .then((res) => {
            callback(res);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   getPortfolio = (portfolioId, callback) => {
      axios.get(this.baseURL + "/portfolio/" + portfolioId, this.config)
         .then((res) => {
            callback(res["data"])
         })
         .catch((err) => {
            console.log(err);
         });
   };

   buy = (ticker, shareCount, sharePrice, portfolioId, callback) => {
      axios.post(this.baseURL + "/stock/buy/" + ticker, {
         shareCount, sharePrice, portfolioId
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   sell = (ticker, shareCount, sharePrice, portfolioId, callback) => {
      axios.post(this.baseURL + "/stock/sell/" + ticker, {
         shareCount, sharePrice, portfolioId
      }, this.config)
         .then((res) => {
            callback();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   getWatchlist = (portfolioId, callback) => {
      axios.get(this.baseURL + "/watchlist?portfolioId=" + portfolioId,
         this.config)
         .then((res) => {
            callback(res["data"]);
         })
         .catch((err) => {
            console.log(err);
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
      axios.get(this.baseURL + "/league/" + inviteCode, this.config)
         .then(res => {
            callback(res["data"]);
         })
         .catch(err => {
            callback(null);
         });
   }
}

export default API;
