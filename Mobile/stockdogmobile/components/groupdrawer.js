import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import SpinningLoader from './spinningloader';
import Drawer from 'react-native-drawer';

export default class GroupDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: []
    }
  }

  componentDidMount() {
    this.setState({leagues: ['Group 1', 'Group 2', 'Group 3']})
  }

  _renderItem(item) {
    console.log(item);
    return (
      <View style={containers.groupItem}>
        <Text style={text.groupText}> {item.item} </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={containers.groupsDrawer}>
        <Text style={text.groupTitle}>My Leagues</Text>
        <FlatList
          style={containers.groupsList}
          data={this.state.leagues}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}