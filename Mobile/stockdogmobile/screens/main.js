import React, { Component } from 'react';
import { TabRoot } from '../routes.js';
import { Font } from 'expo';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
}

  render() {
    console.log('rendering main');
    return( 
       <TabRoot/ >
    );
  }
};