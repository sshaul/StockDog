import React, { Component } from 'react';
import { TextInput } from 'react-native';
import elements from '../style/elements';
import { colors } from '../style/colors';

// Input component for form pages like Login and Register
// Props:
//    type: string indicating what type of input and the placeholder
//    onchange: function that will update the state of parent component
//    value: model for the input value
//    returnKeyType: what the return key will look like
//    refer: reference for tab control if necessary
//    onSubmitEditing: behavior for submitting input value
export default class FormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var placeholder = this.props.type;
    var secure = placeholder === 'password';
    return (
      <TextInput
          style={elements.roundedInput}
          color={colors.white}
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={secure}
          placeholderTextColor={colors.placeholders}
          onChangeText={this.props.onchange}
          value={this.props.value}
          blurOnSubmit={false}
          returnKeyType={this.props.returnKeyType}
          ref={this.props.refer}
          onSubmitEditing={this.props.onSubmitEditing}
          autoCapitalize={"none"}
          underlineColorAndroid={colors.white}
        />
    );
  }
};