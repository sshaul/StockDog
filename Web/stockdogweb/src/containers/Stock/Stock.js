import React, { Component } from 'react';
import './Stock.css';

import Navbar from '../../components/Navigation/Navbar';
import Graph from '../../components/Graph/Graph';

class Stock extends Component {
   render() {
      return (
         <div className="Stock">
            <Navbar />
            <Graph />
            
         </div>
      );
   }
}

export default Stock;
