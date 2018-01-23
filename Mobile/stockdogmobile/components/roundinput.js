import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';

export default class RoundInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var placeholder = this.props.type;
    var secure = false;
    if (placeholder == 'password')
      secure = true;
    return (
      <TextInput
          style={elements.roundedInput}
          placeholder={placeholder}
          secureTextEntry={secure}
          placeholderTextColor="#aaaaaa"
          onChangeText={this.props.onchange}
          value={this.props.value}
        />
    );
  }
};