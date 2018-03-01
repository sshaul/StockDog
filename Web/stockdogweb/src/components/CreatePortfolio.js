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
   }

   createPortfolio = () => {
      this.api.createPortfolio(this.cookies.get("userId"), 1000);
      this.props.history.push("/portfolio");
   }

   render() {
      return (
         <div className="CreatePortfolio">
            <div id="create-portfolio-area">
               <button className="submit-btn" id="create-portfolio-btn"
                  onClick={this.createPortfolio}>
                  <span>Create a portfolio</span></button>
            </div>
         </div>
      );
   }
}

export default withCookies(CreatePortfolio);
