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
         {/*<Listing />
         <Listing />*/}
      </div>
      );
   }
}

export default Portfolio;
