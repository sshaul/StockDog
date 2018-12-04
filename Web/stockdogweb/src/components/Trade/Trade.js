import React, { Component } from 'react';
import './Trade.css';
import Button from '../Button/Button';

class Trade extends Component {
   render() {
      return (
         <div className='Trade'>
            <div className='trade-elements'>
               <div className='trade-element'>
                  <h1>13</h1>
                  <h2>Owned</h2>
               </div>
               <div className='trade-element'>
                  <h1>$20.15</h1>
                  <h2>Price</h2>
               </div>
               <div className='trade-element'>
                  <h1>12M</h1>
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
