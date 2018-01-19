import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Icon from 'react-native-vector-icons/Feather';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstname : "" ,
      lastname: "",
      email: "",
      password: ""
    };
  }

  navToLogin() {
    const navigation = this.props.navigation;
    navigation.goBack(null);
  }

  render() {
    const nav = this.props.navigator;
    return (
      <View style={containers.general}>
        <Text style={text.title}>StockDog</Text>
        <TextInput
          style={elements.roundedInput}
          placeholder="first name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(firstname) => this.setState({firstname})}
          value={this.state.firstname}
        />
        <TextInput
          style={elements.roundedInput}
          placeholder="last name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(lastname) => this.setState({lastname})}
          value={this.state.lastname}
        />
        <TextInput
          style={elements.roundedInput}
          placeholder="email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <View style={containers.horizontal}>
          <TextInput
            style={elements.roundedInput}
            placeholder="password"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity>
            <Icon name='info' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={elements.loginButton}
          >
          <Text style={text.loginButton}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={elements.smallTextButton}>
          <Text 
            style={text.smallText} 
            onPress={this.navToLogin.bind(this)}> 
            Return to log in 
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}