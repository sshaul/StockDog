import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import Graph from '../components/Graph';

class Stock extends Component {
   constructor(props) {
      super(props);

      this.state = {
         ticker: this.props.match.params.ticker.toUpperCase(),
         currentPrice: 0,
         buyOpen: false,
         sellOpen: false
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

   render() {
      return (
         <div className="Stock">
            <Graph title={this.state.ticker} ticker={this.state.ticker} />
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
                        <input type="number" min="1" placeholder="amount" />
                        <button className="buy-btn submit-btn">
                           <span>SUBMIT</span></button>
                     </form>
                  </div>
               </Modal>
               <Modal open={this.state.sellOpen} 
                  onClose={this.onCloseSellModal}
                  className="trans-modal">
                  <div className="trans-modal-content">
                     <form>
                        <input type="number" min="1" placeholder="amount" />
                        <button className="sell-btn submit-btn">
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
