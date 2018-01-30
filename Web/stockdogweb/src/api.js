import axios from 'axios';

// Contains all of the API calls
class API {
   baseURL = 'http://198.199.100.209:5005'

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
   }
}

export default API;
