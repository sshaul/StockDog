import React, { Component } from 'react';
import { TabRoot } from '../routes.js';
import { Font } from 'expo';
import Api from '../api';
import LoadingProfile from '../components/loadingProfile';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hasPortfolio: false,
      isLoading: true
    };

    this.api = new Api();
}

  render() {
    if (this.state.isLoading) {
      this.api.getPortfolios((portfolios) => {
        if (portfolios.length > 0) {
          this.setState({hasPortfolio: true, isLoading: false});
        }
      });

      return <LoadingProfile />;
    }
    else {
      if (!this.state.hasPortfolio) {
        console.log('No portfolios');
        this.props.navigation.navigate('NoPortfoliosProfile', {});
        return null;
      }
      else {
        console.log('Has portfoios');
        return( 
          <TabRoot/ >
        );
      }
    }
  }
};