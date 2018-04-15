import React, { Component } from 'react';
import Routes from './routes.js';
import { Font } from 'expo';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fontLoaded: false,
    };
}
  
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    return(
      this.state.fontLoaded ? 
       Routes() : null
    );
  }
};