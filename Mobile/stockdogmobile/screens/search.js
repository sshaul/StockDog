import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, SearchBar } from 'react-native-elements';
import { colors } from '../style/colors'; 
import NavBar from '../components/navbar';
import API from '../api';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.api = new API();
  }

  searchTicker() {
    if (this.state.text.length !== 0) {
      this.api.getChartData(this.state.text, 'day', (newXData, newYData, error) => {
        if (error) {
          alert(error);
        }
        else {
          AsyncStorage.getItem('currPortfolio').then((value) => {
            Actions.stock({ticker: this.state.text.toUpperCase(), pid: parseInt(value)});
          });
        }
      });
    }  
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <NavBar />
        <View style={containers.generalWithHeaders}>
          <TextInput
            style={[elements.roundedInput, {textAlign: 'center', paddingLeft: 0}]}
            placeholder="Search a ticker"
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.searchTicker.bind(this)}
            value={this.state.text}
            autocorrect={false} />
        </View>
      </View>
    );
  }
}