import React, { Component } from 'react';
import './Stock.css';

import Navbar from '../../components/Navigation/Navbar';
import Graph from '../../components/Graph/Graph';
import Article from '../../components/Article/Article';
import Trade from '../../components/Trade/Trade';

class Stock extends Component {
   render() {
      return (
         <div className="Stock">
            <Navbar />
            <Graph />
            <div className="stock-content">
               <Article title={"About"} content={'Advanced Micro Devices, Inc. engages in the provision of semiconductor businesses. It operates through the Computing and Graphics and Enterprise, Embedded and Semi-Custom segments.'}/>
            </div>
            <Trade quantity={13} price={20.15} volume={'12M'}  />
         </div>
      );
   }
}

export default Stock;
