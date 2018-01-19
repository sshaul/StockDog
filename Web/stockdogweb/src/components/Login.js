import React, { Component } from 'react';

class Login extends Component {
   render() {
      return (
         <div className="Login">
            <div className="login-area">
               <h1>StockDog</h1>
               <form>
                  <input type="email" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <input id="submit-btn" type="submit" value="SUBMIT" />
               </form>
            </div>
         </div>
      );
   }
}

export default Login;
