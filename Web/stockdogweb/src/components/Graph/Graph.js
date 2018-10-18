import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "./Graph.css";

import loading from "../../img/loading.svg";

class Graph extends Component {
   constructor(props) {
      super(props);
      this.state = { isLoading: true }
   }

   loadingAnimation =
   <div className="Graph-loading-animation-wrapper">
      <div className="Graph-loading-animation">
         <img src={loading} alt="Loading" />
      </div>
   </div>
   
   render() { 
      return ( 
         <div class="Graph">
            {this.state.isLoading ? 
            this.loadingAnimation :
            <div></div>}
         </div>
       );
   }
}
 
export default Graph;