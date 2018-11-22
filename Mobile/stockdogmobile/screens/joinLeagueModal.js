import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class JoinLeagueModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteCode: ""
    };
    this.api = new Api();
  }

  onchangename = (inviteCode) => {
    this.setState({inviteCode})
  }

  close = () => {
    Actions.pop();
  }

  submitCode = () => {
    this.api.isValidInviteCode(this.state.inviteCode, (res) => {
      if (res.valid) {
        Actions.setnickname({league: res.league, inviteCode: this.state.inviteCode});
      }
      else {
        alert("Invite code not found.");
      }
    });
  }

  render() {
    var notFound;
    if (this.state.notFound) {
      notFound = <Text style={text.joinLeagueWarning}> League Not Found </Text>
    }
    return (
      <Lightbox verticalPercent={0.7} horizontalPercent={0.8}>
        <View style={containers.addGroupOuterModal}>
          <View style={containers.addGroupModalHeader}>
            <Text style={text.modalHeader}> Join a League </Text>
            <TouchableOpacity onPress={this.close}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <View style={containers.addGroupInnerModal}>
            <Text style={text.joinLeagueTitle}> Invite Code: </Text>
            <FormInput 
              type="Code" 
              onchange={this.onchangename.bind(this)} 
              value={this.state.inviteCode}/>
            <WideButton type="portfolio" onpress={this.submitCode}/>
            {notFound}
          </View>
        </View>
      </Lightbox>
    );
  }
};
