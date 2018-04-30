import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';


export default class Api {

  constructor () {
    this.baseurl = "http://localhost:5005";
    // this.baseurl = "http://198.199.100.209:5005";
    this.headers = {
        'Content-Type': 'application/json'
    }
  }

  //--------------------------- User Mgmt Methods -------------------------//
  register = (firstname, lastname, email, password, callback) => {
    var url = this.baseurl + '/api/user';
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
        })
    }).then((response) => {
        callback(email);
    })
    .catch((error) => {
        console.log(error);
    })
  };

  login = (email, password, callback) => {
    var id;
    var url = this.baseurl + '/api/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      AsyncStorage.setItem('userid', '' + responseJson.userId);
      AsyncStorage.setItem('token', responseJson.token);
      callback();
    })
    .catch((error) => {
      console.log(error);
    })
  };

  //--------------------------- Portfolio Methods -------------------------//
  getPortfolios = (callback) => {
    var uid;
    AsyncStorage.getItem('userid')
      .then((userid) => {
        uid = userid;
        fetch(this.baseurl + '/api/portfolio?userId=' + uid, {
          method: 'GET'
          }).then((response) => response.json())
          .then((responseJson) => {
            AsyncStorage.setItem('portfolios', JSON.stringify(responseJson));
            callback(responseJson);
          })
          .catch(
            (error) => console.log(error)
          );
      });
  };

  createNewLeague = (lname, lbuypower, lstartDate, lendDate, callback) => {
    var uid;
    AsyncStorage.getItem('userid')
      .then((userid) => {
        uid = userid;
        fetch(this.baseurl + '/api/league', {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            ownerId: uid,
            name: lname,
            start: lstartDate,
            end: lendDate,
            startPos: lbuypower
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          callback(responseJson);
        })
        .catch((error) => console.log(error));
      });
  };

  isValidInviteCode = (inviteCode, callback) => {
    fetch(this.baseurl + '/api/league', {
      method: 'GET',
      headers: this.headers,
    }).then((response) => response.json())
    .then((responseJson) => {
      var valid = false;
      var el;
      responseJson.forEach(element => {
        if (element.inviteCode === inviteCode) {
          valid = true;
          el = element;
        }
      });
      if (valid) {
        callback({valid: true, league: el});
      }
      else {
        callback({valid: false});
      }
    })
    .catch((error) => console.log(error));
  };

  joinLeague = (pname, leagueId, code, callback) => {
    var uid;
    console.log(code);
    AsyncStorage.getItem('userid')
      .then((userid) => {
        uid = userid;
        fetch(this.baseurl + '/api/portfolio', {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            userId: uid,
            buyPower: 600,  // ********************* wrong
            name: pname,
            inviteCode: code,
            leagueId: leagueId
          }),
        }).then((response) => callback(response))
        .catch((error) => console.log(error));
      });
  }

  createNewPortfolio = (pname, lid, invitecode, callback) => {
    var uid;
    AsyncStorage.getItem('userid')
      .then((userid) => {
        uid = userid;
        fetch(this.baseurl + '/api/portfolio', {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            userId: uid,
            buyPower: 600,
            name: pname,
            leagueId: lid,
            inviteCode: invitecode
          }),
        }).then((response) => callback(response))
        .catch((error) => console.log(error));
      });
  };

  getPortfolioStocks = (id, callback) => {
    fetch(this.baseurl + '/api/portfolio/' + id, {
      method: 'GET',
      headers: this.headers
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson[0].ticker === null) {
        callback([]);
      }
      else 
        callback(responseJson);
    })
    .catch((error) => console.log(error));
  };

  getPortfolioData = (callback) => {
    AsyncStorage.getItem('portfolios')
      .then((response) => {
        return JSON.parse(response);
      })
      .then((portfolios) => {
        var newXData = [];
        var newYData = [];
        var url = this.baseurl + '/api/portfolio/' + portfolios[0].id + '/history';
        fetch(url, {
          method: 'GET'
        }).then((response) => response.json())
        .then((responseJson) => {
          responseJson.forEach(element => {
            var str = element.time;
            var d = new Date(str);
            var month = d.toLocaleString("en-us", {month: "short"});
            var day = d.toLocaleString("en-us", {day: "numeric"});
            var date = month + " " + day;
            newXData.push(date);
            newYData.push(parseFloat(element.value));
          })
          callback(newXData, newYData);
        }).catch((error) => console.error(error));
      });
  };

  //--------------------------- Buy/Sell Stock Methods -------------------------//
  // Buys or sells a stock
  manageStock = (type, ticker, numShares, price, id, callback) => {
    AsyncStorage.getItem('currPortfolio')
      .then((response) => {
        return JSON.parse(response);
      })
      .then((pid) => {
        console.log('currp', pid);
        fetch(this.baseurl + '/api/stock/' + type + '/' + ticker, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            shareCount: numShares,
            sharePrice: price,
            portfolioId: pid
          })
        }).then((response) => callback(response))
        .catch((error) => console.log(error));
    });
  };

  getChartData = (ticker, range, callback) => {
    var newXData = [];
    var newYData = [];
    var url = this.baseurl + '/api/stock/' + ticker + '/history/' + range;
    fetch(url, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => {
      responseJson.forEach(element => {
        var str = element.time;
        var date = "";
        if (range == 'day') {
          str = element.time.split(" ")[1];
          date = str.split(":")[0] + ":" + str.split(":")[1];
        }
        else if (range == 'week') {
          var d = new Date(str.split(" ")[0]);
          var mo = d.toLocaleString("en-us", {month: "short"});
          var day = d.toLocaleString("en-us", {day: "numeric"});
          var time = str.split(" ")[1];
          date = mo + " " + day + " " + time;
        }
        else {
          var d = new Date(element.time);
          var month = d.toLocaleString("en-us", {month: "short"});
          var day = d.toLocaleString("en-us", {day: "numeric"});
          date = month + " " + day;
        }
        newXData.push(date);
        newYData.push(parseFloat(element.price));
      })
      callback(newXData, newYData);
    }).catch((error) => console.error(error));
  };

  addToWatchlist = (ticker, callback) => {
    var portfolios = [];
    AsyncStorage.getItem('currPortfolio')
      .then((response) => {
        return JSON.parse(response);
      })
      .then((pid) => {
        var url = this.baseurl + '/api/watchlist';
        fetch(url, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            portfolioId: pid,
            ticker: ticker
          })
        }).then((response) => callback(response))
        .catch((error) => console.log(error));
      });
  };

  getWatchlistStocks = (callback) => {
    AsyncStorage.getItem('currPortfolio')
    .then((response) => {return JSON.parse(response);})
    .then((pid) => {
      var url = this.baseurl + '/api/watchlist?portfolioId=' + pid;
      fetch(url, {
        method: 'GET',
        headers: this.headers
      }).then((response) => response.json())
      .then((responseJson) => callback(responseJson))
      .catch((error) => console.log(error));
    });
  }
}