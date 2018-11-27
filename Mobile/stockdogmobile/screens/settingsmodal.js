import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Lightbox from '../components/baseLightbox';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class SettingsModal extends Component {
  constructor(props) {
    super(props);    
    this.state = {
    };

    this.api = new Api();
  }

  componentDidMount() {

  }

  close = () => {
    Actions.pop();
  };

  logout = () => {
    this.api.logout(() => {
      Actions.login();
    });
  }

  render() {
    var disabled = !(this.state.name && 
      this.state.buyPower && 
      this.state.startDate && 
      this.state.endDate)

    return (
      <View style={containers.profileGeneral}>
        <View style={containers.settingsIconHeaders}>
          <TouchableOpacity onPress={this.close}>
            <Icon name='x' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <Text style={text.settingsTitle}>Settings</Text>
        <View style={containers.general}>
          <WideButton type='logout' onpress={this.logout}/>
        </View>
      </View>
    );
  }
};
