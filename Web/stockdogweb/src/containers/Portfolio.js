import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Graph from '../components/Graph';
import { withCookies, Cookies } from 'react-cookie';
import API from "api";
import Navbar from "../components/Navbar";

import CreatePortfolio from "components/CreatePortfolio";
import SideNav from "components/SideNav";

class Portfolio extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   };

   constructor(props) {
      super(props);

      this.api = new API();

      this.cookies = this.props.cookies;

      this.state = {
         portfolios: [],
         portfolioId: -1,
         holdings: [],
         holdingComponents: [],
         watchlist: [],
         watchlistComponents: []
      }
   }

   componentDidMount() {
      // Get the owned portfolios
      this.api.getAllPortfolios(this.cookies.get("userId"), (portfolios) => {
         if (portfolios.length !== 0) {
            this.setState({
               portfolios,
               portfolioId: this.cookies.get("currPortfolio")
            });
            this.getPortfolio();
            this.cookies.set("currPortfolio", this.state.portfolioId);
         }
         else {
            this.setState({
               portfolioId: null
            });
         }
      });

      // Get the watchlist
      this.api.getWatchlist(this.cookies.get("currPortfolio"), (watchlist) => {
         this.setState({watchlist});
         this.createWatchlist();
      });
   }

   // Get the portfolio's holdings
   getPortfolio = () => {
      this.api.getPortfolio(this.state.portfolioId, (holdings) => {
         this.setState({
            holdings
         });
         this.createHoldings();
      });
   };

   createHoldings = () => {
      var holdingComponents = [];
      this.state.holdings.forEach((holding) => {
         // Make sure there is something in the holding
         // This is because if the portfolio has nothing, the array is
         // of length 1 with a null holding
         if (holding["ticker"] !== null ) {
            holdingComponents.push(
               <div className="portfolio-holding" key={holding["ticker"]}>
                  <div className="portfolio-holding-title">
                     <a href={"/stock/" + holding["ticker"]}>
                        {holding["ticker"]}
                     </a>
                  </div>
                  <div className="portfolio-holding-amount">
                     {holding["shareCount"]} shares
                  </div>
               </div>
            );
         }
      });
      this.setState({
         holdingComponents
      });
   };

   createWatchlist = () => {
      var watchlistComponents = [];
      this.state.watchlist.forEach((stock) => {
         watchlistComponents.push(
            <div className="portfolio-holding" key={stock["ticker"]}>
               <div className="portfolio-holding-title">
                  <a href={"/stock/" + stock["ticker"]}>{stock["ticker"]}</a>
               </div>
            </div>
         );
      });
      this.setState({
         watchlistComponents
      });
   }

   render() {
      if (this.state.portfolioId === null) {
         return (
            <CreatePortfolio />
         )
      }
      else if (this.cookies.get("currPortfolio") === "undefined") {
         return (
            <div>
               <SideNav />
               <Navbar />
               <div className="portfolio-undefined">
                  <h1>Select a portfolio</h1>
               </div>
            </div>
         )
      }
      return (
         <div className="Portfolio">
            <SideNav />
            <div className="portfolio-area">
               <Navbar />
               <div className="portfolio-league-title">
                  <h1>{this.cookies.get("currLeagueName")}</h1>
               </div>
               <Graph title="Portfolio" ticker="PORTFOLIO"
                  portfolioId={this.state.portfolioId}/>
               <div className="portfolio-content">
                  <h1>Owned</h1>
                  {this.state.holdingComponents}
                  <br />
                  <h1>Watchlist</h1>
                  {this.state.watchlistComponents}
               </div>
            </div>
         </div>
      );
   }
}

export default withCookies(Portfolio);
