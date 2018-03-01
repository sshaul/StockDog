import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Graph from '../components/Graph';
import { withCookies, Cookies } from 'react-cookie';

class Profile extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   };

   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;
   }

   render() {
      return (
         <div className="Profile">
            <Graph title="Profile" ticker="AMD" />
            <div className="profile-content">
               <h1>Profile</h1>
               <h1>Watchlist</h1>
            </div>
         </div>
      );
   }
}

export default withCookies(Profile);
