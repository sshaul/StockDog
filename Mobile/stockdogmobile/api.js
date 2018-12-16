import axios from 'axios';

const baseurl = 'http://localhost:5005/api';

const config = {
   'headers': {
      'Content-Type': 'application/json'
   }
}

const register = async(firstName, lastName, email, password) => {
   var data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
   };
   var response = await axios.post(baseurl + '/users', data, config);

   return response;
}

const login = async (username, password) => {
   console.log('in login function');
   var data = {
      'username': username,
      'password': password
   };
   console.log('requesting soon');
   var response = await axios.post(baseurl + '/users/session', data, config);
   console.log(response);
};

const api = {
   register,
   login,
};

export default api;