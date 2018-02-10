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
                  <button id="login-reg-submit-btn"
                     className="submit-btn"><span>SUBMIT</span></button>
               </form>
               <div className="login-links">
                  <Link to="/forgotpassword">Forgot password</Link><br />
                  <Link to="/register">Create an account</Link>
               </div>
            </div>
         </div>
      );
   }
}

export default Login;
