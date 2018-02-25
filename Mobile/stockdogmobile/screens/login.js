import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import WideButton from '../components/widebutton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    var user = "";
    if (this.props.navigation.state.params) {
      user = this.props.navigation.state.params.email;
    }
    this.state = { 
      email : user,
      password: ""
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }
  
  navToRegister() {
    const navigate = this.props.navigation.navigate;
    navigate('Register', {});
  }

  render() {
    var disabled = !(this.state.email && this.state.password);
    return (
      <View style={containers.general}>
        <Text style={text.title}>StockDog</Text>
        <TextInput
          style={elements.roundedInput}
          placeholder="email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          onSubmitEditing={() => {
            this.focusNextField('two');
          }}
          returnKeyType={ "next" }
          ref={ input => {
            this.inputs['one'] = input;
          }}
        />
        <TextInput
          style={elements.roundedInput}
          placeholder="password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <WideButton type='login' disabled={disabled}/>
        <TouchableOpacity
          style={elements.smallTextButton}>
          <Text style={text.smallText}> Forgot Password? </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={elements.smallTextButton}>
          <Text 
            style={text.smallText} 
            onPress={this.navToRegister.bind(this)}> 
            Create an account 
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}