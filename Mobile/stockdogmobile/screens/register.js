import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Icon from 'react-native-vector-icons/Feather';
import PopoverTooltip from 'react-native-popover-tooltip';
import WideButton from '../components/widebutton';
import RoundInput from '../components/roundinput';
import Api from '../api';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      firstname : "" ,
      lastname: "",
      email: "",
      password: ""
    };

    this.api = new Api();
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  navToLogin() {
    const navigation = this.props.navigation;
    navigation.goBack(null);
  }

  register() {
    this.api.register(this.state.firstname, this.state.lastname,
      this.state.email, this.state.password, (email) => {
        this.props.navigation.navigate('Login', {email: this.state.email});
      });
  }

  validatePassword(password) {
    return password.length >= 8 && password.match('.*[0-9].*');
  }

  render() {
    var disabled = !(this.state.firstname && this.state.lastname 
                    && this.state.email && this.validatePassword(this.state.password));
    return (
      <KeyboardAwareScrollView 
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={containers.general}
        scrollEnabled={false}>
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
          <PopoverTooltip
            ref='tooltip1'
            buttonComponent={
              <View style={elements.popoverButton}>
                <Icon name='info' size={30} color='white' />
              </View>
            }
            items={[
              {
                label: 'Password must be at least 8 characters long and contain at least 1 number.',
                onPress: () => {}
              }
            ]}
            />
        </View>
        <WideButton type='register' disabled={disabled} onpress={this.register.bind(this)}/>
        <TouchableOpacity
          style={elements.smallTextButton}>
          <Text 
            style={text.smallText} 
            onPress={this.navToLogin.bind(this)}> 
            Return to log in 
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}