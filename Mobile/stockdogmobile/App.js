import { Component } from 'react';
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
      'assistant-bold': require('./assets/fonts/Assistant-Bold.otf'),
      'assistant': require('./assets/fonts/Assistant-Regular.otf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    console.log('wtf');
    return(
      this.state.fontLoaded ? 
       Routes() : null
    );
  }
};