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
    fetch('http://localhost:5000/api/v1.0', 
     {
      method: 'GET'})
      .then(response => {
        var sdtext = response._bodyText;
        this.setState({textValue : sdtext});
      })
      .catch(error => {
        console.log('ERROR: '+  error);
      })};
  
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
