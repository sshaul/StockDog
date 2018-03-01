export function authenticated(userId, token) {
   if (userId === undefined || token === undefined) {
      return false;
   }

   return true;
}
