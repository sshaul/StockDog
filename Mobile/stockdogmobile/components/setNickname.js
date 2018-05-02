import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, AsyncStorage } from 'react-native';
import Lightbox from './baseLightbox';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Modal from 'react-native-modal';
import RoundInput from './roundinput';
import WideButton from './widebutton';
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
    // If contain a league, when setting nickname pass league into post
    // Else post to league and create new league, then post to portfolio to make portfolio in league
    var props = this.props.navigation.state.params;
    console.log(props);
    if (props.hasOwnProperty('buyPower')) {
      this.api.createNewLeague(props.name, props.buyPower, props.startDate, props.endDate, (res) => {
        console.log(res);
        console.log('nickname: ' + this.state.nickname);
        this.api.createNewPortfolio(this.state.nickname, res.id, res.inviteCode, (res) => {
          console.log('created new portfolio');
          console.log('RESULTS: ');
          console.log(res);
          Actions.drawerOpen();
          Actions.profile();
        })
      });
    }
    else {
      console.log('HERE!!!!!!!');
      console.log(props.inviteCode);
      this.api.joinLeague(this.state.nickname, props.league.id, props.inviteCode, (res) => {
        Actions.profile();
      });
    }
  
  }

  render() {
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
            <RoundInput 
              type="Nickname" 
              onchange={this.onchangename.bind(this)} 
              value={this.state.nickname}/>
            <WideButton type="join" onpress={this.handleOnPress}/>
          </View>
        </View>
      </Lightbox>
    );
  }
};
