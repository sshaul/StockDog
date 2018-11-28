import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import Graph from '../../components/Graph/Graph';
import Listing from '../../components/Listing/Listing';

import './Portfolio.css';

class Portfolio extends Component {
   render() {
      return (
         <div className="Portfolio">
            <Navbar links={[
               {
                  title: "Month League",
                  location: "/league/monthLeague"
               },
               {
                  title: "Penny Stocks",
                  location: "/league/pennyStocks"
               },
               {
                  title: "Swing Stocks",
                  location: "/league/swingStocks"
               }
            ]
            }/>
         <Graph />
         <div className="portfolio-listing-news-area">
            <div className="portfolio-listing-area">
               <Listing title="Portfolio"/>
               <Listing title="Watchlist"/>
            </div>
         </div>
      </div>
      );
   }
}

export default Portfolio;
