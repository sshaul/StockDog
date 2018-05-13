import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from "react-router-dom";
import API from "api";

import Logout from "./Logout";

class SideNav extends Component {
   constructor(props) {
      super(props);

      this.api = new API();
      this.cookies = this.props.cookies;

      this.state = {
         portfolios: [],
         elements: []
      };
   }

   componentDidMount() {
      this.api.getAllPortfolios(this.cookies.get("userId"), (data) => {
         console.log("All the portfolios:");
         console.log(data);
         this.setState({
            portfolios: data,
         });
         this.createSideNavElements();
      });

   }

   createSideNavElements = () => {
      var elements = [];

      this.state.portfolios.forEach((portfolio) => {
         console.log(portfolio);
         elements.push(
            <div className="side-nav-element" key={portfolio.id} 
            onClick={()=> {this.switchToPortfolio(portfolio.id, portfolio["league"])}}>
               <div className="side-nav-element-title">
                  <p>{portfolio["league"]}</p>
               </div>
               <div className="side-nav-element-value">
                  <p>$5000</p>
               </div>
            </div>
         );
      });

      this.setState({
         elements
      }); 
   }

   goToJoinLeague = () => {
      this.props.history.push("/join-league");
   };

   goToCreateLeague = () => {
      this.props.history.push("/create-league");
   };

   switchToPortfolio = (portfolioId, leagueName, leagueId) => {
         console.log("Switching to portfolioId: " + portfolioId);
      this.cookies.set("currPortfolio", portfolioId);
      this.cookies.set("currLeagueName", leagueName);
      this.cookies.set("currLeagueId", leagueId)
      window.location.reload();
   };

   render() {
      return (
         <div className="SideNav">
            <div className="side-nav-btns">
               <button className="submit-btn side-nav-btn" id="league-advance"
                  onClick={this.goToJoinLeague}>
                  <span>Join</span></button>
               <button className="submit-btn side-nav-btn" id="league-advance"
                  onClick={this.goToCreateLeague}>
                  <span>Create</span></button>
            </div>
            {this.state.elements}
            <Logout />
         </div>
      );
   }
}

export default withRouter(withCookies(SideNav));
