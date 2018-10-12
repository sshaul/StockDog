import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo';
import containers from '../style/containers';
import elements from '../style/elements';
import {colors} from '../style/colors';
import text from '../style/text';
import FormInput from '../components/formInput';
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

    this.inputs = {};
    this.api = new Api();
  }

  componentDidMount() {
    // Check if user is already logged in
    AsyncStorage.getItem('token', (token) => {
      // TODO: Add session validation
    })
  }

  focusNextField = (id) => {
    this.inputs[id].focus();
  };
  
  navToRegister() {
    Actions.register({});
  };

  login() {
    this.api.login(this.state.email, this.state.password,
      (err) => {
        if (err) {
          alert('Invalid login.');
        }
        else {
          Actions.main({});
        }
      }
    );
  };

  render() {
    var disabled = !(this.state.email && this.state.password);
    return (
      <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={containers.general}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}>
          <LinearGradient
            colors={['transparent', colors.lightBackground]}
            style={containers.generalGradient}>
            <Image 
              source={require('../assets/logoCrop.png')} 
              style={containers.logo}/>
            <Text style={text.title}>StockDog</Text>
            <FormInput
              type="email"
              value={this.state.email}
              onchange={(email) => this.setState({email})}
              returnKeyType={ "next" }
              onSubmitEditing={() => {this.focusNextField('password');}}/>
            <FormInput
              type="password"
              value={this.state.password}
              onchange={(password) => this.setState({password})}
              returnKeyType={ "done" }
              onSubmitEditing={this.login.bind(this)}
              refer={ input => {this.inputs['password'] = input;}}/>
            <WideButton 
              type='login' 
              disabled={disabled} 
              onpress={this.login.bind(this)}/>
            {/* <TouchableOpacity
              style={elements.smallTextButton}>
              <Text style={text.smallText}> Forgot Password? </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={elements.smallTextButton}>
              <Text 
                style={text.smallText} 
                onPress={this.navToRegister.bind(this)}> 
                Create an account 
              </Text>
            </TouchableOpacity>
          </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }
}