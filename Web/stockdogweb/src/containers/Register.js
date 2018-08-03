import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import sdLogo from '../img/sd1.png';
import infoIcon from '../img/feather-icons/info.svg';
import { withAlert } from 'react-alert';
import API from "../api/api";

class Register extends Component {
   passwordReqs = "Password must be 8 characters long and include a number.";

   constructor(props) {
      super(props);

      this.api = new API();

      this.state = {
         fname: "",
         lname: "",
         email: "",
         pass: ""
      }
   }

   register = (event) => {
      event.preventDefault();

      this.api.register(
         this.state.fname,
         this.state.lname,
         this.state.email,
         this.state.pass)
         .then((res) => {
            this.props.alert.success(`${this.state.email} has been registered. Please log in.`);
            this.props.history.push('/');
         })
         .catch((errMsg) => {
            this.props.alert.error("Email is already taken.");
         });
   };

   registerOnChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   render() {
      return (
         <div className="Register">
            <div className="register-area">
               <Link to="/"> <img alt="StockDog Logo" src={sdLogo}/></Link>
               <form onSubmit={this.register}>
                  <input id="fname" type="text" placeholder="first name"
                     onChange={this.registerOnChange} />
                  <input id="lname" type="text" placeholder="last name"
                     onChange={this.registerOnChange} />
                  <input id="email" type="email" placeholder="email"
                     onChange={this.registerOnChange} />
                  <div className="register-password-field">
                     <input id="pass" type="password" placeholder="password"
                        onChange={this.registerOnChange} />
                     <div className="register-password-tt">
                        <img src={infoIcon} alt="tooltip"
                           data-tip={this.passwordReqs}/>
                        <ReactTooltip />
                     </div>
                  </div>
                  <button id="login-reg-submit-btn"
                     className="submit-btn"><span>SUBMIT</span></button>
               </form>
            </div>
         </div>
      );
   }
}

export default withAlert(Register);
