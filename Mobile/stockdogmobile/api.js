import React, { Component } from 'react';
import Main from './screens/main';


export default class Api {

   constructor () {
      this.baseurl = "http://localhost:5005";
      // this.baseurl = "http://198.199.100.209:5005";
      this.userid = 1;
      this.headers = {
         'Content-Type': 'application/json'
      }
   }
   

   createDrawers = (callback) => {
      fetch(this.baseurl + '/api/portfolio?userId=' + this.userid, {
         method: 'GET'
      }).then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         return callback({
            Portfolio: {
              screen: Main,
              navigationOptions: {
                header: null
              }
            }
          });
      })
      .catch(
         (error) => console.log(error)
      );
   };

   getPortfolios = (callback) => {
      fetch(this.baseurl + '/api/portfolio?userId=' + this.userid, {
         method: 'GET'
      }).then((response) => response.json())
      .then((responseJson) => {
         callback(responseJson);
      })
      .catch(
         (error) => console.log(error)
      );
   };

   createNewPortfolio = (callback) => {
      fetch(this.baseurl + '/api/portfolio', {
         method: 'POST',
         headers: this.headers,
         body: JSON.stringify({
            userId: this.userid,
            buyPower: 600
          }),
      }).then((response) => callback(response))
      .catch((error) => console.log(error));
   };
}