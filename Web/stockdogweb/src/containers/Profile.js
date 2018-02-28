import React, { Component } from 'react';
import Graph from '../components/Graph';

class Profile extends Component {
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

export default Profile;
