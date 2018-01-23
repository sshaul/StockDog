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
    this.state = { 
      username : "" ,
      password: ""
    };
  }
  
  navToRegister() {
    const navigate = this.props.navigation.navigate;
    navigate('Register', {});
  }

  render() {
    const nav = this.props.navigator;
    return (
      <View style={containers.general}>
        <Text style={text.title}>StockDog</Text>
        <TextInput
          style={elements.roundedInput}
          placeholder="username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={elements.roundedInput}
          placeholder="password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <WideButton type='login'/>
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