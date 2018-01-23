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
    return (
      <TouchableOpacity
          style={elements.loginButton}
          onPress={this.props.onpress}
          >
          <Text style={text.loginButton}>{buttonText}</Text>
        </TouchableOpacity>
    );
  }
};