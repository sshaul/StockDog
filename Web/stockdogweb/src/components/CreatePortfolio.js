import React, { Component} from 'react';
import { instanceOf } from "prop-types";
import API from "api";
import { withCookies, Cookies } from "react-cookie";
import "../css/App.css";

class CreatePortfolio extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   }

   constructor(props) {
      super(props);

      this.api = new API();

      this.cookies = this.props.cookies;

      this.state = {
         portfolioName: ""
      };
   }

   createPortfolio = () => {
      this.api.createPortfolio(this.cookies.get("userId"), 
                               this.state.portfolioName, 1000);
      this.props.history.push("/portfolio");
   };

   _onChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   render() {
      return (
         <div className="CreatePortfolio">
            <div id="create-portfolio-area">
               <input id="portfolioName create-portfolio-name" type="text" 
                  placeholder="Name of portfolio" />
               <button className="submit-btn" id="create-portfolio-btn"
                  onClick={this.createPortfolio}>
                  <span>Create a portfolio</span></button>
            </div>
         </div>
      );
   }
}

export default withCookies(CreatePortfolio);
