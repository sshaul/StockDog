import axios from 'axios';
import handleError from './handleError';

const SERVER_DOMAIN = 'http://198.199.100.209:5005/api';

// Used to get all the standard api headers
const getHeaders = () => {
   return {
      'header': {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
   };
};

// HTTP GET call
export const get = (path) => {
   return new Promise((resolve, reject) => {
      axios.get(`${SERVER_DOMAIN}${path}`, getHeaders())
         .then(response => {resolve(response)})
         .catch(error => {reject(handleError(error))});
   });
}

// HTTP POST call
export const post = (path, data) => {
   return new Promise((resolve, reject) => {
      axios.post(`${SERVER_DOMAIN}${path}`, data, getHeaders())
         .then(response => {resolve(response)})
         .catch(error => {reject(handleError(error))});
   });
}

// HTTP DELETE call
export const del = (path: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${SERVER_DOMAIN}${path}`, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};
