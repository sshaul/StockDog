export default authReducer = (state = {}, action) => {
   switch (action.type) {
      // case 'LOGIN_USER':
      //     return { user: action.creds.user, password: action.creds.password };
      case 'REGISTER_USER':
         return { email: action.payload.email };
      default:
         return state;
   }
};
