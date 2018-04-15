import React, { Component } from 'react';
import API from 'api';
import Graph from '../components/Graph';
import { ChevronLeft } from 'react-feather';
import { withRouter } from "react-router-dom";

class Stock extends Component {
   constructor(props) {
      super(props);

      this.api = new API();

      this.state = {
         ticker: this.props.match.params.ticker.toUpperCase(),
         portfolioId: this.props.match.params.portfolioId,
         currentPrice: 0,
         transactionAmount: null,
      };
   }

   goBack = () => {
      this.props.history.goBack();
   };
   _onChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });
   };

   updateCurrentPrice = (currentPrice) => {
      this.setState({
         currentPrice
      });
   }

   buy = (event) => {
      event.preventDefault();
      console.log("Buying " + this.state.transactionAmount);

      this.api.buy(
         this.state.ticker,
         parseInt(this.state.transactionAmount, 10),
         parseFloat(this.state.currentPrice),
         this.state.portfolioId,
         () => {
            alert(this.state.transactionAmount + " shares of " +
                  this.state.ticker + " bought at " +
                  this.state.currentPrice + ".");
         }
      );
   }

   sell = (event) => {
      event.preventDefault();

      this.api.sell(
         this.state.ticker,
         parseInt(this.state.transactionAmount, 10),
         parseFloat(this.state.currentPrice),
         this.state.portfolioId,
         () => {
            alert(this.state.transactionAmount + " shares of " +
                  this.state.ticker + " sold at " +
                  this.state.currentPrice + ".");
         }
      );
   }

   render() {
      return (
         <div className="Stock">
            <div className="back-btn">
               <ChevronLeft size={48} onClick={this.goBack} />
            </div>
            <div className="stock-titles">
               <h1>{this.state.ticker}</h1>
               <h2>${this.state.currentPrice}</h2>
            </div>
            <Graph ticker={this.state.ticker}
               updateCurrentPrice={this.updateCurrentPrice} />
            <div className="stock-transaction-area">
               <form>
                  <input id="transactionAmount" type="number" min="1" 
                     placeholder="Amount" onChange={this._onChange} />
                  <button id="stock-buy-btn" className="stock-btn submit-btn"
                     onClick={this.buy}><span>Buy</span></button>
                  <button id="stock-sell-btn" className="stock-btn submit-btn"
                     onClick={this.sell}><span>Sell</span></button>
               </form>
            </div>
         </div>
      );
   }
}

export default withRouter(Stock);
