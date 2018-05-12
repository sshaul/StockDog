import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
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
    return (
      <View style={containers.portfolioItem}>
        <TouchableOpacity onPress={this._onPress.bind(this, this.props.ticker)}>
          <Text style={text.bigPortfolioText}> {this.props.ticker} </Text>
        </TouchableOpacity>
        {numShares}
        <Text style={text.bigPortfolioText}> ${this.props.price} </Text>
      </View>
    );
  }
};