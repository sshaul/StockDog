import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import sdLogo from '../img/sd1.png';
import infoIcon from '../img/feather-icons/info.svg';

class Register extends Component {
   passwordReqs = "Password must be 8 characters long and include a number."

   render() {
      return (
         <div className="Register">
            <div className="register-area">
               <Link to="/"> <img alt="StockDog Logo" src={sdLogo}/></Link>
               <form>
                  <input type="text" placeholder="first name" />
                  <input type="text" placeholder="last name" />
                  <input type="email" placeholder="email" />
                  <div className="register-password-field">
                     <input type="password" placeholder="password" />
                     <div className="register-password-tt">
                        <img src={infoIcon} alt="tooltip"
                           data-tip={this.passwordReqs}/>
                        <ReactTooltip />
                     </div>
                  </div>
                  <input id="submit-btn" type="submit" value="SUBMIT" />
               </form>
            </div>
         </div>
      );
   }
}

export default Register;
