import React, { Component } from 'react';
import './Stock.css';

import Navbar from '../../components/Navigation/Navbar';
import Graph from '../../components/Graph/Graph';
import Article from '../../components/Article/Article';
import Trade from '../../components/Trade/Trade';
import Transaction from '../../components/Trade/Transaction/Transaction';

class Stock extends Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "About",
         content: "Advanced Micro Devices, Inc. engages in the provision of semiconductor businesses. It operates through the Computing and Graphics and Enterprise, Embedded and Semi-Custom segments.",
         transactionIsOpen: false
      };
   }

   activateTransactionModal = () => {
      this.setState({transactionIsOpen: true});
   };

   deactivateTransactionModal = () => {
      this.setState({transactionIsOpen: false});
   };

   render() {
      return (
         <div className="Stock">
            <Navbar />
            <Graph />
            <div className="stock-content">
               <Article title={this.state.title} content={this.state.content}/>
            </div>
            <Trade quantity={13} price={20.15} volume={'12M'} 
               onClickBtn={this.activateTransactionModal} 
            />
            <Transaction isOpen={this.state.transactionIsOpen} 
               onClose={this.deactivateTransactionModal}
            />
         </div>
      );
   }
}

export default Stock;
