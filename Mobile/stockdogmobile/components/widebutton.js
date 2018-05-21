import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';

export default class WideButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var buttonText = "";
    if (this.props.type == 'login')
      buttonText = 'LOGIN';
    else if (this.props.type == 'register')
      buttonText = 'REGISTER';
    else if (this.props.type == 'buy')
      buttonText = 'BUY';
    else if (this.props.type == 'sell')
      buttonText = 'SELL';
    else if (this.props.type == 'portfolio')
      buttonText = 'Next';
    else if (this.props.type == 'join')
      buttonText = 'Join league!';
    else if (this.props.type == 'logout')
      buttonText = 'LOGOUT';

    var style = elements.loginButton;
    if (this.props.disabled) {
      style = elements.disabledLoginButton;
    };

    return (
      <TouchableOpacity
          style={style}
          onPress={this.props.onpress}
          disabled={this.props.disabled}
          >
          <Text style={text.loginButton}>{buttonText}</Text>
        </TouchableOpacity>
    );
  }
};