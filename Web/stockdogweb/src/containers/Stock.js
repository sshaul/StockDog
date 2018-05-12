import React, { Component } from 'react';
import API from 'api';
import Graph from '../components/Graph';
import { ChevronLeft, Eye, EyeOff } from 'react-feather';
import { withRouter } from "react-router-dom";
import { withCookies } from 'react-cookie';

class Stock extends Component {
   constructor(props) {
      super(props);

      this.api = new API();
      this.cookies = this.props.cookies;

      this.state = {
         ticker: this.props.match.params.ticker.toUpperCase(),
         portfolioId: this.cookies.get("currPortfolio"),
         currentPrice: 0,
         transactionAmount: null,
         watchlistDiv:
            <div className="stock-watchlist" onClick={this.addToWatchlist}>
               <Eye />
            </div>,
         watchlistId: null,
         amount: 0
      };
   }

   componentDidMount() {
      // Getting entire portfolio for stock information currently
      // May want to change later
      this.api.getPortfolio(this.state.portfolioId, (portfolio) => {
         portfolio.forEach((stock) => {
            console.log(stock);
            if (stock["ticker"] === this.state.ticker) {
               // do stuff with the result
            }
         });
      });

      this.getWatchlist();
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

   getWatchlist = () => {
      // Getting watchlist information
      this.api.getWatchlist(this.state.portfolioId,
         (watchlist) => {
            watchlist.forEach((stock) => {
               if (stock["ticker"] === this.state.ticker) {
                  this.setState({
                     watchlistDiv:
                     <div className="stock-watchlist"
                     onClick={this.deleteFromWatchlist}>
                        <EyeOff />
                     </div>,
                     watchlistId: stock["id"]
                  });
               }
            })
         });
   };

   addToWatchlist = () => {
      this.api.addToWatchlist(
         this.state.ticker, this.state.portfolioId, () => {
            this.setState({
               watchlistDiv:
                  <div className="stock-watchlist"
                  onClick={this.deleteFromWatchlist}>
                     <EyeOff />
                  </div>
            });
            this.getWatchlist();
         }
      );
   };

   deleteFromWatchlist = () => {
      this.api.deleteFromWatchlist(
         this.state.watchlistId, () => {
            this.setState({
               watchlistId: null,
               watchlistDiv:
                  <div className="stock-watchlist" onClick={this.addToWatchlist}>
                     <Eye />
                  </div>,
            });
         }
      )
   };

   render() {
      return (
         <div className="Stock">
            <div className="back-btn">
               <ChevronLeft size={48} onClick={this.goBack} />
            </div>
            <div className="stock-titles">
               <h1>{this.state.ticker}</h1>
               {this.state.watchlistDiv}
               <h2>${this.state.currentPrice}</h2>
            </div>
            <Graph ticker={this.state.ticker}
               updateCurrentPrice={this.updateCurrentPrice} />
            <div className="stock-transaction-area">
               <h5>Owned: 3</h5>
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

export default withCookies(withRouter(Stock));
