import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import * as shape from 'd3-shape';
import Icon from 'react-native-vector-icons/Feather';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import WideButton from '../components/widebutton';
import Chart from 'react-native-chartjs';
import ChartView from 'react-native-highcharts';
import { DateRoot } from '../routes';
import StockChart from '../components/stockchart';

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      data: [],
      isLoading: true,
      selectedIndex: 0,
      range: 'day'
    };
  };

  componentDidMount() {
    // this.updateChart();
  }

  updateIndex(selectedIndex) {
    var index = '';
    if (selectedIndex == 0) {
      console.log('stlil day..');
      index = 'day';
    }
    else if (selectedIndex == 1) {
      console.log('week1');
      index = 'week';
    }
    else if (selectedIndex == 2) {
      index = 'month';
    }
    else {
      index = 'year';
    }
    this.setState({selectedIndex, range: index});
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={containers.chart}>
            <Text style={text.money}>AMD</Text>
            <Text style={text.money}>$20.05</Text>
            <StockChart range={this.state.range} />
            {/* { this.updateChart() } */}
        </View>
        <View style={containers.underChart}>
          <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
            buttons={['D', 'W', 'M', 'Y']}
            containerStyle={{flex: 0.3}}
            textStyle={{color: colors.white}}
            buttonStyle={{backgroundColor: colors.grey}}
            selectedButtonStyle={{backgroundColor: colors.white}}
          />
          <View style={containers.buttons}>
            <TouchableOpacity
              style={elements.buyButton}
              onPress={this.props.onpress}
              >
              <Text style={text.loginButton}>BUY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={elements.sellButton}
              onPress={this.props.onpress}
              >
              <Text style={text.loginButton}>SELL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}