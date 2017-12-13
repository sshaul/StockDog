import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends Component{
  constructor(){
      super();
      this.state = {
          textValue:''
      }
  }

  helloWorld() {
    this.setState({textValue : 'hello!!!'});
    // fetch(--api endpoint--)...
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.helloWorld.bind(this)}
          title="API Button"
          color="#841584"
          accessibilityLabel="Calls hello world from API"
        />
      <Text>{this.state.textValue}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
