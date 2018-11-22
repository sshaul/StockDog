import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { colors } from '../style/colors.js'; 

export default class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPress(ticker) {
    AsyncStorage.getItem('currPortfolio').then((value) => {
      Actions.stock({ticker: ticker, pid: parseInt(value)});
    });
  }

  render() {
    const numShares = 
      this.props.numShares ? 
        <Text style={text.smallPortfolioText}> {this.props.numShares} shares </Text> 
        : null;

    const price = 
      this.props.price ? 
        <Text style={text.bigPortfolioText}> ${this.props.price} </Text> : null;
    return (
      <View elevation={2} >
        <TouchableOpacity onPress={this._onPress.bind(this, this.props.ticker)}>
          <Text style={text.bigPortfolioText}> {this.props.ticker} </Text>
        </TouchableOpacity>
        {numShares}
        {price}
      </View>
    );
  }
};