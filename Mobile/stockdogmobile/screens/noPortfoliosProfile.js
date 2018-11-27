import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import NavBar from '../components/navbar';

export default class NoPorfoliosProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateModalVisible: false,
      isJoinModalVisible: false
    };
  }

  openAddModal () {
    Actions.addportfolio({});
  }

  openJoinModal () {
    Actions.joinportfolio({});
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
      </View>
    );
  }
}