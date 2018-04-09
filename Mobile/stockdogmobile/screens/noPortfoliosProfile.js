import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import NavBar from '../components/navbar';
import AddPortfolioModal from'../components/addportfoliomodal';
import JoinLeagueModal from '../components/joinLeagueModal';

export default class NoPorfoliosProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateModalVisible: false,
      isJoinModalVisible: false
    };
  }

  openAddModal () {
    this.setState({isCreateModalVisible: true});
  }

  closeAddModal () {
    this.setState({isCreateModalVisible: false});
  }

  openJoinModal () {
    console.log('opening join');
    this.setState({isJoinModalVisible: true});
  }

  closeJoinModal () {
    this.setState({isJoinModalVisible: false});
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <NavBar />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity 
            style={elements.loginButton}
            onPress={this.openAddModal.bind(this)}
            > 
            <Text style={text.loginButton}>
              CREATE A LEAGUE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={elements.loginButton}
            onPress={this.openJoinModal.bind(this)}
            >  
            <Text style={text.loginButton}>
              JOIN A LEAGUE
            </Text>
          </TouchableOpacity>
        </View>
        <AddPortfolioModal 
          visibility={this.state.isCreateModalVisible}
          _close={this.closeAddModal.bind(this)}/>
        <JoinLeagueModal
          visibility={this.state.isJoinModalVisible}
          _close={this.closeJoinModal.bind(this)}/>
      </View>
    );
  }
}