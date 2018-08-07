import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import GoHome from '../components/GoHome';

import API from '../api/api';
import Feed from '../components/Feed';

class LeagueHome extends Component {
   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;
      this.api = new API();

      this.state = {
         title: this.cookies.get("currLeagueName"),
         memberContents: []
      };
   }

   componentDidMount() {
      this.api.getLeague(this.cookies.get("currLeagueId"))
         .then(res => {
            const data = res["data"];
            this.setState({
               inviteCode: data["inviteCode"]
            })
         })
         .catch(errMsg => {
            this.props.alert.error("Failed to get league invite code.");
         });

      this.api.getLeagueMembers(this.cookies.get("currLeagueId"))
         .then(res =>{
            const data = res["data"];
            var memberContents = [];

            // Sort the array
            data.sort((a, b) => {
               return parseFloat(b.value) - parseFloat(a.value);
            });

            // Generating html for each member
            data.forEach((member, index) => {
               memberContents.push(
                  <tr key={member["name"]}>
                     <td>{index + 1}</td>
                     <td>{member["name"]}</td>
                     <td className="league-home-money">${member["value"]}</td>
                  </tr>
                  );
            });

            this.setState({
               memberContents
            });
         })
         .catch(errMsg => {
            this.props.alert.error("Failed to load league members.");
         });
      }

   render() {
      return (
         <div className="LeagueHome">
            <GoHome />
            <h1>{this.state.title}</h1>
            <h6>Invite Code</h6>
            <h4>{this.state.inviteCode}</h4>
            <div id="league-home-portfolio-link"><Link to="/portfolio">
               Your Portfolio</Link></div>
            <h3>Feed</h3>
            <Feed currLeagueId={this.cookies.get("currLeagueId")}/>
            <h3>Rankings</h3>
            <table>
               <tbody>
                  {this.state.memberContents}
               </tbody>
            </table>
         </div>
      );
   }
}

export default withCookies(LeagueHome);
