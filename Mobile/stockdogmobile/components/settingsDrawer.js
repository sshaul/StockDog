import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Button, SearchBar, Card, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class SettingsDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: []
    }

    this.api = new Api();
  }

  componentDidMount() {
  }


  render() {
    return (
      <View style={containers.groupsDrawer}>
        <View style={containers.leaguesList}>
          <Text style={text.groupTitle}>Settings</Text>
          
        </View>
      </View>
    );
  }
}