import React, { Component } from 'react';
import { SearchStockRoot } from '../routes.js';
import { Font } from 'expo';

export default class SearchMain extends Component {
  constructor(props, context) {
    super(props, context);
}

  render() {
    return( 
       <SearchStockRoot/ >
    );
  }
};