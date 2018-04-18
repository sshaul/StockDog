import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import SpinningLoader from './spinningloader';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Feather';

export default class LeagueDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: []
    }
  }

  componentDidMount() {
    this.setState({
      leagues: [{'key': 1, 'name': 'Group 1'}, 
      {'key': 2, 'name': 'Group 2'}, 
      {'key': 3, 'name': 'Group 3'}]
    });
  }

  _renderItem(item) {
    return (
      <View style={containers.groupItem}>
        <Text style={text.groupText}> {item.item.name} </Text>
        <View style={elements.groupDivider}> 
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={containers.groupsDrawer}>
        <View style={containers.leaguesList}>
          <Text style={text.groupTitle}>My Leagues</Text>
          <FlatList
            style={containers.groupsList}
            data={this.state.leagues}
            renderItem={this._renderItem}
          />
        </View>
        <View>
          <TouchableOpacity style={containers.leaguesFooter}>
            <Icon name='plus-circle' size={30} color={colors.dark} />
            <Text style={text.addGroupText}> Create a new league </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}