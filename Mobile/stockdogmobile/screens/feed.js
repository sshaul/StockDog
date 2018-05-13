import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import NavBar from '../components/navbar';
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.api = new Api();
  }

  componentDidMount() {
    this.api.getTransactions(() => {
      console.log('got transactions');
    });
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <NavBar />
        
      </View>
    );
  }
}