import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo';
import containers from '../style/containers';
import elements from '../style/elements';
import {colors} from '../style/colors';
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

    this.inputs = {};
    this.api = new Api();
  }

  componentDidMount() {
    // Check if user is already logged in
    AsyncStorage.getItem('token', (token) => {
      // console.log(token);
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
            colors={['transparent', 'rgb(87, 122, 142)']}
            style={containers.generalGradient}
            >
          <Image source={require('../assets/logo.png')} style={containers.logo}/>
            <TextInput
              style={elements.roundedInput}
              placeholder="email"
              placeholderTextColor="#aaaaaa"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              blurOnSubmit={ false }
              onSubmitEditing={() => {
                this.focusNextField('two');
              }}
              returnKeyType={ "next" }
              ref={ input => {
                this.inputs['one'] = input;
              }}
              autoCapitalize={"none"}
              underlineColorAndroid={colors.white}
            />
            <TextInput
              style={elements.roundedInput}
              placeholder="password"
              placeholderTextColor="#aaaaaa"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              onSubmitEditing={() => {
                this.login.bind(this);
              }}
              returnKeyType={ "done" }
              ref={ input => {
                this.inputs['two'] = input;
              }}
              autoCapitalize={"none"}
              underlineColorAndroid={colors.white}
            />
          <WideButton type='login' disabled={disabled} onpress={this.login.bind(this)}/>
          {/* <TouchableOpacity
            style={elements.smallTextButton}>
            <Text style={text.smallText}> Forgot Password? </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={elements.smallTextButton}>
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