import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Icon from 'react-native-vector-icons/Feather';
import PopoverTooltip from 'react-native-popover-tooltip';
import WideButton from '../components/widebutton';
import RoundInput from '../components/roundinput';

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

  register() {
    console.log('here');
    this.props.navigation.navigate('Main', {});
  }

  render() {
    return (
      <View style={containers.general}>
        <Text style={text.title}>StockDog</Text>
        <RoundInput 
          type="first name" 
          onchange={(firstname) => this.setState({firstname})}
          value={this.state.firstname}/>
        <RoundInput
          type="last name"
          onchange={(lastname) => this.setState({lastname})}
          value={this.state.lastname}
        />
        <RoundInput
          type="email"
          onchange={(email) => this.setState({email})}
          value={this.state.email}
        />
        <View style={containers.horizontal}>
          <RoundInput
            type="password"
            onchange={(password) => this.setState({password})}
            value={this.state.password}
          />
          <TouchableOpacity>
            <PopoverTooltip
              ref='tooltip1'
              buttonComponent={
                <Icon name='info' size={30} color='white' />
              }
              items={[
                {
                  label: 'Password must be at least 8 characters long and contain at least 1 special character.',
                  onPress: () => {}
                }
              ]}
              // animationType='timing'
              // using the default timing animation
              />
          </TouchableOpacity>
        </View>
        <WideButton type='register' onpress ={this.register.bind(this)}/>
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