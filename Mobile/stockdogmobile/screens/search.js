import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  searchTicker() {
    const navigate = this.props.navigation.navigate;
    navigate('Stock', {ticker: this.state.text.toUpperCase(), pid: 1});
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={containers.general}>
          <TextInput
            style={[elements.roundedInput, {textAlign: 'center', paddingLeft: 0}]}
            placeholder="Search a ticker"
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.searchTicker.bind(this)}
            value={this.state.text} />
        </View>
      </View>
    );
  }
}