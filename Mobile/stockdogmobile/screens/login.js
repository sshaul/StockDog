import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import WideButton from '../components/widebutton';
import Api from '../api';

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
    this.api = new Api();
  }

  focusNextField(id) {
    this.inputs[id].focus();
  };
  
  navToRegister() {
    Actions.register({});
  };

  setStorage = ((key, value) => {
    AsyncStorage.setItem(key, value).then((value) => {
      console.log(value);
    })
  });

  login() {
    this.api.login(this.state.email, this.state.password,
      () => {Actions.main({})});
  };

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
        <WideButton type='login' disabled={disabled} onpress={this.login.bind(this)}/>
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