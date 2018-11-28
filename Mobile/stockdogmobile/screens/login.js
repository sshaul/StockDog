import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo';
import { colors } from '../style/colors';
import styles from '../style/screens/loginRegister';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Api from '../api';
import { loginUser } from '../actions';

mapDispatchToProps = (dispatch) => ({
  loginUser: (username, password) => {
    dispatch(loginUser(username, password));
  }
});

var logoImage = require('../assets/logo.png');

class Login extends Component {
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
  
  navToRegister = () => {
    Actions.register({});
  };

  login = () => {
    this.props.loginUser(this.state.email, this.state.password);
  };

  render() {
    var disabled = !(this.state.email && this.state.password);
    return (
      <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}>
          <LinearGradient
            colors={['transparent', colors.lightBackground]}
            style={styles.gradientBackground}>
            <Image 
              source={logoImage} 
              style={styles.logo}/>
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
              onSubmitEditing={this.login}
              refer={ input => {this.inputs['password'] = input;}}/>
            <WideButton 
              type='login' 
              disabled={disabled} 
              onpress={this.login}/>
            {/* <TouchableOpacity
              style={styles.smallTextButton}>
              <Text style={styles.smallText}> Forgot Password? </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.smallTextButton}>
              <Text 
                style={styles.smallText} 
                onPress={this.navToRegister}> 
                Create an account 
              </Text>
            </TouchableOpacity>
          </LinearGradient>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
