import React, { Component } from 'react';
import GoHome from '../components/GoHome';

class LeagueHome extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="LeagueHome">
            <GoHome />
            <h1>Penny Stocks</h1>
            <h6>Invite Code</h6>
            <h4>ASDNJA</h4>
            <div id="league-home-portfolio-link"><p>Your Portfolio</p></div>
            <table>
               <tbody>
                  <tr>
                     <td>1</td>
                     <td>Ash</td>
                     <td className="league-home-money">$20410.23</td>
                  </tr>
                  <tr className="league-home-spacer"></tr>
                  <tr>
                     <td>2</td>
                     <td>Salonee</td>
                     <td className="league-home-money">$18523.30</td>
                  </tr>
               </tbody>
            </table>
         </div>
      );
   }
}

export default LeagueHome;
