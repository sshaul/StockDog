import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS, Keyboard } from 'react-native';
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
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secure}
          placeholderTextColor="#aaaaaa"
          onChangeText={this.props.onchange}
          value={this.props.value}
          blurOnSubmit={false}
          returnKeyType={this.props.returnKeyType}
          ref={this.props.refer}
          onSubmitEditing={this.props.onSubmitEditing}
        />
    );
  }
};