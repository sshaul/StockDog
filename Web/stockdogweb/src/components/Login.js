import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import sdLogo from '../img/sd1.png';

class Login extends Component {
   render() {
      return (
         <div className="Login">
            <div className="login-area">
               <img alt="StockDog Logo" src={sdLogo}/>
               <form>
                  <input type="email" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <input id="submit-btn" type="submit" value="SUBMIT" />
               </form>
               <div class="login-links">
                  <Link to="/forgotpassword">Forgot password</Link><br />
                  <Link to="/register">Create an account</Link>
               </div>
            </div>
         </div>
      );
   }
}

export default Login;
