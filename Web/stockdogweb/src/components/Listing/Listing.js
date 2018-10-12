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
      this.props.listings.forEach(listing => {

         // Need to do the priceChange element seperately because
         // it changes depending on if its negative or positive
         var priceChangeElement;

         if (listing.priceChange >= 0) {
            priceChangeElement = <div class="listing-item-price-change listing-up-color">
               (+{listing.priceChange})
            </div>
         }
         else {
            priceChangeElement = <div class="listing-item-price-change listing-down-color">
               ({listing.priceChange})
            </div>
         }

         // Need to do amount separately since 0 shows nothing
         var amountElement = <div></div>;
         if (listing.amount !== 0) {
            amountElement = <div class="listing-item-amount">{listing.amount} shares</div>
         }

         listingElements.push(
            <div class="listing-item">
               <div class="listing-item-title">{listing.title}</div>
               <div class="listing-item-desc">{listing.desc}</div>
               <div class="listing-item-price-info">
                  <div class="listing-item-price">${listing.price}</div>
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
         <div class="Listing">
            <div class="listing-title">Portfolio</div>
            <div class="listing-items">
               {this.state.listingElements}
            </div>
         </div>
      );
   }
}

export default Listing;