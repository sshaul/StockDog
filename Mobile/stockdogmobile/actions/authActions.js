const registerUser = (firstname, lastname, email, password) => {
   return {
      'type': 'REGISTER_USER',
      'payload': {
         firstname,
         lastname,
         email,
         password
      }
   }
}

const loginUser = (userId, token) => {
   return {
      type: 'LOGIN_USER',
      payload: {
         userId,
         token
      }
   };
};

export {
   registerUser,
   loginUser
}