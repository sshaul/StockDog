import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import "../css/App.css";

class CreatePortfolio extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   }

   render() {
      return (
         <div className="CreatePortfolio">
            <div className="create-portfolio-area">
               <h3>You are currently not part of any league</h3>
               <p>
                  <Link to="/create-league">Create</Link> or&nbsp;
                  <Link to="/join-league">join</Link> a league.
               </p>
            </div>
         </div>
      );
   }
}

export default withCookies(CreatePortfolio);
