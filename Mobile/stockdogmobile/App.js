import React, { Component } from 'react';
import Routes from './routes.js';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Font } from 'expo';
import reducers from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fontLoaded: false,
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'assistant-bold': require('./assets/fonts/Assistant-Bold.otf'),
      'assistant': require('./assets/fonts/Assistant-Regular.otf'),
      'assistant-semibold': require('./assets/fonts/Assistant-SemiBold.otf'),
      'assistant-extralight': require('./assets/fonts/Assistant-ExtraLight.otf'),
      'assistant-light': require('./assets/fonts/Assistant-Light.otf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    return(
      this.state.fontLoaded ? 
        Routes(store) : null
    );
  }
};