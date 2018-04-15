import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import SpinningLoader from './spinningloader';
import NavBar from './navbar';
import Drawer from 'react-native-drawer';
import GroupDrawer from './groupdrawer';

export default class LoadingProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <NavBar/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <Icon name='loader' size={48} color='white' /> */}
          <SpinningLoader />
        </View>
      </View>
    );
  }
}