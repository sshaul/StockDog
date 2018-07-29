import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from "react-router-dom";
import { withAlert } from 'react-alert';
import API from "api/api";

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
<<<<<<< Updated upstream
      this.api.getAllPortfolios(this.cookies.get("userId"), (data) => {
         this.setState({
            portfolios: data,
         });
         this.createSideNavElements();
      });
=======
      this.api.getAllPortfolios(this.cookies.get("userId"))
         .then(response => {
            const data = response['data'];
            data.sort((a, b) => {
               return a.league > b.league;
            });
            this.setState({
               portfolios: data,
            });
            this.createSideNavElements();
         })
         .catch(errorMessage => {
				this.props.alert.error('Failed to load portfolios.');
         });
>>>>>>> Stashed changes

   }

   createSideNavElements = () => {
      var elements = [];
<<<<<<< Updated upstream

      this.state.portfolios.forEach((portfolio) => {
         elements.push(
            <div className="side-nav-element" key={portfolio.id} 
               onClick={()=> {this.switchToPortfolio(portfolio.id, 
                  portfolio["league"], portfolio["leagueId"])}}>
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
=======
      const portfolioAmt = this.state.portfolios.length;
      

      this.state.portfolios.forEach((portfolio, index) => {
	  		this.api.getCachedPortfolioValue(portfolio.id)
            .then(response => {
               var data = response["data"];
               elements.push(
                  <div className="side-nav-element" key={index} 
                     onClick={()=> {this.switchToPortfolio(portfolio.id, 
                        portfolio["league"], portfolio["leagueId"])}}>
                        <div className="side-nav-element-title">
                           <p>{portfolio["league"]}</p>
                        </div>
                        <div className="side-nav-element-value">
                           <p>${Math.round(data["value"]*100)/100}</p>
                        </div>
                     </div>
               );

               // Only update once all values have been fetched
               if (elements.length === portfolioAmt) {
                  elements.sort((a, b) => {
                     return parseInt(a.key, 10) - parseInt(b.key, 10);
                  });
                  this.setState({
                     elements
                  }); 
               }
            })
            .catch(errorMessage => {
               this.props.alert.error('Failed to load portfolio value.');
            });
	     	});
>>>>>>> Stashed changes
   }

   goToJoinLeague = () => {
      this.props.history.push("/join-league");
   };

   goToCreateLeague = () => {
      this.props.history.push("/create-league");
   };

   switchToPortfolio = (portfolioId, leagueName, leagueId) => {
      console.log("Switching to:");
      console.log(portfolioId);
      console.log(leagueName);
      console.log(leagueId);
      this.cookies.set("currPortfolio", portfolioId);
      this.cookies.set("currLeagueName", leagueName);
      this.cookies.set("currLeagueId", leagueId)
      this.cookies.get("currPortfolio");
      this.cookies.get("currLeagueName");
      this.cookies.get("currLeagueId");
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

export default withAlert(withRouter(withCookies(SideNav)));
