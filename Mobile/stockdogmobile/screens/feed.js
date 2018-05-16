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
      text: '',
      transactions: []
    };

    this.api = new Api();
  }

  componentDidMount() {
    this.api.getTransactions((transactions) => {
      console.log('got transactions');
      this.setState(transactions);
      console.log(transactions);
    });
  }

  _renderItem(item) {
    console.log(item);
    return (
      <ListItem
        key={item.item.id}
        title={item.item.id}
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
      <View style={containers.profileGeneral}>
        <NavBar />

        <View style={containers.leagueName}>
          <Text style={text.title}>Feed</Text>
        </View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.leagues}
          renderItem={this._renderItem.bind(this)}/>
      </View>
    );
  }
}