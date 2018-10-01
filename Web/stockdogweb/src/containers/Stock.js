import React, { Component } from 'react';
import API from 'api/api';
import Graph from '../components/Graph';
import { ChevronLeft, Eye, EyeOff } from 'react-feather';
import { withRouter } from "react-router-dom";
import { withCookies } from 'react-cookie';
import { withAlert } from 'react-alert';

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
         shareCount: 0
      };
   }

   componentDidMount() {
      this.getShareCount();

      this.getWatchlist();
   }

   getShareCount = () => {
      // Getting entire portfolio for stock information currently
      // May want to change later
      this.api.getPortfolio(this.state.portfolioId)
         .then(response => {
            const portfolio = response["data"];
            var buyPower;
            var shareCount;
            portfolio.forEach((stock) => {
               buyPower = stock["buyPower"];
               if (stock["ticker"] === this.state.ticker) {
                  shareCount = stock["shareCount"];
               }
            });
            this.setState({
               shareCount, buyPower
            });
         })
         .catch(errorMessage => {
            this.props.alert.error("Error loading portfolio information.");
         })
   }

   goBack = () => {
      this.props.history.push("/portfolio");
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
      if (parseInt(this.state.transactionAmount, 10) <= 0) {
         this.props.alert.error("Buy amount must be a positive value");
         return;
      }

      event.preventDefault();
      this.api.buy(
         this.state.ticker,
         parseInt(this.state.transactionAmount, 10),
         this.state.portfolioId)
            .then(response => {
               this.getShareCount();
               this.props.alert.show(this.state.transactionAmount + " shares of " +
                     this.state.ticker + " bought at " +
                     this.state.currentPrice + ".");
            })
            .catch(errorMessage => {
               console.log(errorMessage);
               this.props.alert.error("Failed to buy.");
            });
   }

   sell = (event) => {
      if (parseInt(this.state.transactionAmount, 10) <= 0) {
         this.props.alert.error("Sell amount must be a positive value");
         return;
      }

      event.preventDefault();
      this.api.sell(
         this.state.ticker,
         parseInt(this.state.transactionAmount, 10),
         this.state.portfolioId)
            .then(response => {
               this.getShareCount();
               this.props.alert.show(this.state.transactionAmount + " shares of " +
                     this.state.ticker + " sold at " +
                     this.state.currentPrice + ".");
            })
            .catch(errorMessage => {
               this.props.alert.error("Failed to sell.");
            });
   }

   getWatchlist = () => {
      // Getting watchlist information
      this.api.getWatchlist(this.state.portfolioId)
         .then(res => {
            const watchlist = res["data"];
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
            });
         })
         .catch(errMsg => {this.props.alert.error("Failed to check for watchlist.")});
   };

   addToWatchlist = () => {
      this.api.addToWatchlist(this.state.ticker, this.state.portfolioId)
         .then(res => {
            this.setState({
               watchlistDiv:
                  <div className="stock-watchlist"
                  onClick={this.deleteFromWatchlist}>
                     <EyeOff />
                  </div>
            });
            this.getWatchlist();
         })
         .catch(errorMessage => {
            this.props.alert.error("Failed to add to watchlist.");
         });
   };

   deleteFromWatchlist = () => {
      this.api.deleteFromWatchlist(this.state.watchlistId)
         .then(res => {
            this.setState({
               watchlistId: null,
               watchlistDiv:
                  <div className="stock-watchlist" onClick={this.addToWatchlist}>
                     <Eye />
                  </div>,
            });
         })
         .catch(errMsg => {this.props.alert.error("Failed to delete off watchlist.")});
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
               <h5>Owned: {this.state.shareCount}</h5>
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

export default withRouter(withAlert(withCookies(Stock)));
