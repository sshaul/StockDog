import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import API from 'api';

import sdLogo from '../img/sd1.png';

class Login extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   };

   constructor(props) {
      super(props);

      this.api = new API();

      this.cookies = this.props.cookies;

      this.state = {
         username: "",
         pass: ""
      };
   }

   loginOnChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   login = (event) => {
      event.preventDefault();

      this.api.login(
         this.state.username,
         this.state.pass,
         (userId, token) => {
            // Save userId and token in cookie
            this.cookies.set("userId", userId);
            this.cookies.set("token", token);
            this.props.history.push('/profile'); 
         }
      );
   }

   render() {
      return (
         <div className="Login">
            <div className="login-area">
               <img alt="StockDog Logo" src={sdLogo}/>
               <form>
                  <input id="username" type="email" placeholder="email"
                     onChange={this.loginOnChange} />
                  <input id="pass" type="password" placeholder="password" 
                     onChange={this.loginOnChange} />
                  <button id="login-reg-submit-btn"
                     onClick={this.login}
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

export default withCookies(Login);
