import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import StockChart from '../components/stockchart';
import PortfolioItem from '../components/portfolioItem';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userid : "",
      data: [],
      isLoading: true
    };
  };

  getData() {
    return [
      {key: 'item1', ticker: 'AMD', numShares: '3', price: '20'},
      {key: 'item2', ticker: 'WMT', numShares: '6', price: '3'}
    ];
  }

  componentDidMount() {
      
  };

  _renderItem = ({item}) => {
    return <PortfolioItem 
      ticker={item.ticker}
      numShares={item.numShares}
      price={item.price}
      navigation={this.props.navigation} />
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    const p = [
      {key: 'item1', ticker: 'AMD', numShares: '3', price: '20'},
      {key: 'item2', ticker: 'WMT', numShares: '6', price: '3'},
      {key: 'item3', ticker: 'WMT', numShares: '6', price: '3'},
      {key: 'item4', ticker: 'WMT', numShares: '6', price: '3'},
      {key: 'item5', ticker: 'WMT', numShares: '6', price: '3'}
    ];
    const w = [
      {key: 'item1', ticker: 'RAD',  price: '20'},
      {key: 'item2', ticker: 'WMT', price: '3'}
    ];
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <ScrollView style={{flex: 1}}>
            <StockChart range={this.state.range} username='user'/>
            <View style={{flex: 0.3}}>
              <Text style={text.profileLabels}>Portfolio</Text>
              <FlatList
                style={{flex: 1}}
                data={p}
                renderItem={this._renderItem}
              />
              <Text style={text.profileLabels}>Watchlist</Text>
              <FlatList
                style={{flex: 1}}
                data={w}
                renderItem={this._renderItem}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}