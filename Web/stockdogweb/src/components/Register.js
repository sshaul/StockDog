import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sdLogo from '../img/sd1.png';


class Register extends Component {
   render() {
      return (
         <div className="Register">
            <div className="register-area">
               <Link to="/"> <img alt="StockDog Logo" src={sdLogo}/></Link>
               <form>
                  <input type="text" placeholder="first name" />
                  <input type="text" placeholder="last name" />
                  <input type="email" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <input id="submit-btn" type="submit" value="SUBMIT" />
               </form>
            </div>
         </div>
      );
   }
}

export default Register;
