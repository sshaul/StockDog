import React, { Component } from 'react';
import './Listing.css';

class Listing extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {
      this.generateListings();
   }

   generateListings = () => {
      var listingElements = [];

      // Dont' do anything if there are no listings
      if (!this.props.listings) {
         return;
      }

      this.props.listings.forEach(listing => {

         // Need to do the priceChange element seperately because
         // it changes depending on if its negative or positive
         var priceChangeElement;
         const prefixSymbol = listing.priceChange >= 0 ?
            '+' : '';
         const colorClass = listing.priceChange >= 0 ?
            'listing-up-color' : 'listing-down-color';

         priceChangeElement = 
            <div className={"listing-item-price-change " + colorClass}>
               ({prefixSymbol}{listing.priceChange})
            </div>

         // Need to do amount separately since 0 shows nothing
         var amountElement = null;
         if (listing.amount !== 0) {
            amountElement = 
               <div className="listing-item-amount">
                  {listing.amount} shares
               </div>
         }

         listingElements.push(
            <div className="listing-item">
               <div className="listing-item-title">{listing.title}</div>
               <div className="listing-item-desc">{listing.desc}</div>
               <div className="listing-item-price-info">
                  <div className="listing-item-price">${listing.price}</div>
                  {priceChangeElement}
               </div>
               {amountElement}
            </div>
         )
      });
      this.setState({ listingElements });
   }

   render() {
      return (
         <div className="Listing">
            <div className="listing-title">{this.props.title}</div>
            <div className="listing-items">
               {this.state.listingElements}
            </div>
         </div>
      );
   }
}

export default Listing;
