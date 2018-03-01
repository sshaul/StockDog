import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import API from 'api';
import Graph from '../components/Graph';

class Stock extends Component {
   constructor(props) {
      super(props);

      this.api = new API();

      this.state = {
         ticker: this.props.match.params.ticker.toUpperCase(),
         portfolioId: this.props.match.params.portfolioId,
         currentPrice: 0,
         buyOpen: false,
         sellOpen: false,
         buyCount: null,
         sellCount: null
      };
   }

   onOpenBuyModal = () => {
      this.setState({buyOpen: true});
   }

   onOpenSellModal = () => {
      this.setState({sellOpen: true});
   }

   onCloseBuyModal = () => {
      this.setState({buyOpen: false});
   }

   onCloseSellModal = () => {
      this.setState({sellOpen: false});
   }

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

      this.api.buy(
         this.state.ticker,
         parseInt(this.state.buyCount, 10),
         parseFloat(this.state.currentPrice),
         this.state.portfolioId,
         () => {
            alert(this.state.buyCount + " shares of " +
                  this.state.ticker + " bought at " +
                  this.state.currentPrice + ".");
         }
      );
   }

   sell = (event) => {
      event.preventDefault();

      this.api.sell(
         this.state.ticker,
         parseInt(this.state.sellCount, 10),
         parseFloat(this.state.currentPrice),
         this.state.portfolioId,
         () => {
            alert(this.state.sellCount + " shares of " +
                  this.state.ticker + " sold at " +
                  this.state.currentPrice + ".");
         }
      );
   }

   render() {
      return (
         <div className="Stock">
            <Graph title={this.state.ticker} ticker={this.state.ticker} 
               updateCurrentPrice={this.updateCurrentPrice} />
            <div className="stock-buy-sell-btns">
               <button id="stock-buy-btn" className="stock-btn submit-btn"
                  onClick={this.onOpenBuyModal}><span>BUY</span></button>
               <button id="stock-sell-btn" className="stock-btn submit-btn"
                  onClick={this.onOpenSellModal}><span>SELL</span></button>
               <Modal open={this.state.buyOpen} 
                  onClose={this.onCloseBuyModal}
                  className="trans-modal">
                  <div className="trans-modal-content">
                     <form>
                        <input id="buyCount" type="number" min="1" 
                           placeholder="amount" onChange={this._onChange} />
                        <button className="buy-btn submit-btn"
                           onClick={this.buy}>
                           <span>SUBMIT</span></button>
                     </form>
                  </div>
               </Modal>
               <Modal open={this.state.sellOpen} 
                  onClose={this.onCloseSellModal}
                  className="trans-modal">
                  <div className="trans-modal-content">
                     <form>
                        <input type="number" min="1" placeholder="amount" 
                           id="sellCount" onChange={this._onChange}/>
                        <button className="sell-btn submit-btn"
                           onClick={this.sell}>
                           <span>SUBMIT</span></button>
                     </form>
                  </div>
               </Modal>
            </div>
         </div>
      );
   }
}

export default Stock;
