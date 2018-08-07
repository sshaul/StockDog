import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withAlert } from 'react-alert';

import API from '../api/api';

class Logout extends Component {
   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;
      this.api = new API();
   }

   logout = () => {
      this.api.logout(this.cookies.get("userId"))
         .then(res => {
            this.cookies.remove("currLeagueId");
            this.cookies.remove("currLeagueName");
            this.cookies.remove("currPortfolio");
            this.cookies.remove("token");
            this.cookies.remove("userId");
            window.location.reload();
         })
         .catch(errMsg => {
            this.props.alert.error("Failed to logout.")
         });
   }

   render() {
      return (
         <div className="Logout">
            <button onClick={this.logout}>Logout</button>
         </div>
      );
   }
}

export default withAlert(withCookies(Logout));
