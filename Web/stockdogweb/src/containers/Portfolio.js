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
         holdings: []
      }
   }

   componentDidMount() {
      this.api.getAllPortfolios(this.cookies.get("userId"), (portfolios) => {
         if (portfolios.length !== 0) {
            this.setState({
               portfolios,
               portfolioId: portfolios[0]["id"]
            });
         }
      });
   }

   getPortfolio = () => {
      this.api.getPortforlio(this.state.portfolioId, (holdings) => {
         this.setState({
            holdings: []
         });
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
            <Graph title="Portfolio" ticker="AMD" 
               portfolioId={this.state.portfolioId}/>
            <div className="portfolio-content">
               <h1>Owned</h1>
               <h1>Watchlist</h1>
            </div>
         </div>
      );
   }
}

export default withCookies(Portfolio);
