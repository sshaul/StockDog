import axios from 'axios';

// Contains all of the API calls
class API {
   baseURL = 'http://198.199.100.209:5005';
   config = {
      "headers": {
         "Content-Type": "application/json"
      }
   };

   // Gets the stock history of a given stock and timeFrame
   // Accepts a callback to do something with the history list
   stockHistory = (ticker, timeFrame, cb) => {
      const url = this.baseURL + '/api/stock/' + ticker + 
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
      axios.post(this.baseURL + "/register", {
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
      axios.post(this.baseURL + "/user/login", {
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
}

export default API;
