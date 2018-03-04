import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import Graph from '../components/Graph';
import { withCookies, Cookies } from 'react-cookie';
import API from "api";

import CreatePortfolio from "components/CreatePortfolio";

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
         portfolioId: null,
         holdings: [],
         holdingComponents: []
      }
   }

   componentDidMount() {
      this.api.getAllPortfolios(this.cookies.get("userId"), (portfolios) => {
         if (portfolios.length !== 0) {
            this.setState({
               portfolios,
               portfolioId: portfolios[0]["id"]
            });
            this.getPortfolio();
         }
      });
   }

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
      console.log("Creating holdings.")
      this.state.holdings.forEach((holding) => {
         console.log(holding["ticker"]);
         console.log(holding["shareCount"]);
         holdingComponents.push(
            <div className="portfolio-holding" key={holding["ticker"]}>
               <div className="portfolio-holding-title">
                  {holding["ticker"]}
               </div>
               <div className="portfolio-holding-amount">
                  {holding["shareCount"]} shares
               </div>
            </div>
         );
      });
      this.setState({
         holdingComponents
      });
   };

   render() {
      if (this.state.portfolioId === null) {
         return (
            <CreatePortfolio />
         )
      }
      return (
         <div className="Portfolio">
            <Graph title="Portfolio" ticker="PORTFOLIO" 
               portfolioId={this.state.portfolioId}/>
            <div className="portfolio-content">
               <h1>Owned</h1>
               {this.state.holdingComponents}
               <h1>Watchlist</h1>
            </div>
         </div>
      );
   }
}

export default withCookies(Portfolio);
