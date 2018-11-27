import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, AsyncStorage } from 'react-native';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class SetNickname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: ""
    };
    this.api = new Api();
  }

  onchangename = (nickname) => {
    this.setState({nickname})
  }

  close = () => {
    Actions.pop();
  }

  handleOnPress = () => {
    // Check if the navigation state params contain a league
    var props = this.props.navigation.state.params;
    if (props.hasOwnProperty('buyPower')) {
      this.api.createNewLeague(props.name, props.buyPower, props.startDate, props.endDate, (res) => {
        this.api.createNewPortfolio(this.state.nickname, res.id, res.inviteCode, (pres) => {
          AsyncStorage.setItem('currPortfolio', '' + pres.id);
          Actions.drawerOpen();
          Actions.profile();
        })
      });
    }
    else {
      this.api.joinLeague(this.state.nickname, props.league.id, props.inviteCode, (res) => {
          AsyncStorage.setItem('currPortfolio', '' + res.id);
          Actions.profile();
      });
    }
  
  }

  render() {
    var disabled = !this.state.nickname;

    return (
      <Lightbox verticalPercent={0.7} horizontalPercent={0.8}>
        <View style={containers.addGroupOuterModal}>
          <View style={containers.addGroupModalHeader}>
            <TouchableOpacity onPress={this.close}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <View style={containers.addGroupInnerModal}>
            <Text style={text.joinLeagueTitle}> Set your nickname: </Text>
            <FormInput 
              type="Nickname" 
              onchange={this.onchangename.bind(this)} 
              value={this.state.nickname}/>
            <WideButton disabled={disabled} type="join" onpress={this.handleOnPress}/>
          </View>
        </View>
      </Lightbox>
    );
  }
};
