import React, { Component } from 'react';
import './Trade.css';
import Button from '../Button/Button';

class Trade extends Component {
   render() {
      return (
         <div className='Trade'>
            <div className='trade-elements'>
               <div className='trade-element'>
                  <h1>{this.props.quantity}</h1>
                  <h2>Owned</h2>
               </div>
               <div className='trade-element'>
                  <h1>${this.props.price}</h1>
                  <h2>Price</h2>
               </div>
               <div className='trade-element'>
                  <h1>{this.props.volume}</h1>
                  <h2>Volume</h2>
               </div>
            </div>
            <div className="trade-button">
               <Button text={'Trade'} width={260} />
            </div>
         </div>
      );
   }
}

export default Trade;
