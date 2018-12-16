import axios from 'axios';

const baseurl = 'http://localhost:5005/api';

const config = {
   'headers': {
      'Content-Type': 'application/json'
   }
}

const register = async (firstName, lastName, email, password) => {
   var data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
   };
   return await axios.post(baseurl + '/users', data, config);
}

const login = async (email, password) => {
   var data = {
      'email': email,
      'password': password
   };
   return await axios.post(baseurl + '/users/session', data, config);
};

export {
   register,
   login,
};