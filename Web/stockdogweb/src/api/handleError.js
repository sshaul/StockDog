// Deals with common API request errors

export default function (error) {
   const { status, message } = error;
   switch (status) {
      default:
         // do nothing for now
   }
   return message;
}
