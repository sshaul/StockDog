import React, { Component } from 'react';
import { ProfileStockRoot } from '../routes.js';
import { Font } from 'expo';

export default class ProfileMain extends Component {
  constructor(props, context) {
    super(props, context);
}

  render() {
    return( 
       <ProfileStockRoot />
    );
  }
};