export default registerUser = (firstname, lastname, email, password) => {
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

// export function loginUser(username, password) {
//    var creds = {user: username, password: password};
//    return { creds, type: 'LOGIN_USER' };
// };