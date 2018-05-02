import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage, ScrollView } from 'react-native';
import { Button, SearchBar, Card, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import SpinningLoader from './spinningloader';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class LeagueDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: []
    }

    this.api = new Api();
  }

  componentDidMount() {
    this.pollPortfolios();
  }

  static onEnterDrawer = () => {
    console.log('entered');
  }

  pollPortfolios() {
    this.api.getPortfolios((portfolios) => {
      if (portfolios.length !== this.state.leagues.length) {
        this.setState({leagues: portfolios});
      }
    });
    setTimeout(this.pollPortfolios.bind(this), 3000);
  }

  createNew = () => {
    Actions.noportfolios();
  }

  keyExtractor = (item, index) => index

  handlePress = (item) => {
    AsyncStorage.setItem('currPortfolio', '' + item.item.id).then((value) => {
      AsyncStorage.getItem('currPortfolio').then((value) => {
        Actions.drawerClose();
        Actions.push('profileMain');
      })
      
    })
  }

  _renderItem(item) {
    return (
      <ListItem
        key={item.item.id}
        title={item.item.league}
        subtitle={
          <View style={{
            flexDirection: 'column',
            paddingLeft: 10,
            paddingTop: 5
          }}>
            <Text> Buy Power: {item.item.buyPower} </Text>
          </View>
        }
        onPress={() => {this.handlePress(item)}}
      />
    );
  }

  render() {
    return (
      <View style={containers.groupsDrawer}>
        <View style={containers.leaguesList}>
          <Text style={text.groupTitle}>My Leagues</Text>
          <FlatList
            // style={containers.groupsList}
            keyExtractor={this.keyExtractor}
            data={this.state.leagues}
            renderItem={this._renderItem.bind(this)}
          />
        </View>
        <View>
          <TouchableOpacity style={containers.leaguesFooter} onPress={this.createNew.bind(this)}>
            <Icon name='plus-circle' size={30} color={colors.dark} />
            <Text style={text.addGroupText}> Add a new league </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}