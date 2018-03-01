import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import StockChart from '../components/stockchart';
import PortfolioItem from '../components/portfolioItem';
import Api from '../api';
import NoPortfoliosProfile from '../components/noPorfoliosProfile';
import LoadingProfile from '../components/loadingProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userid : "",
      isLoading: true,
      portfolioid: 1,
      selectedIndex: 0,
      range: 'day',
      portfolios: []
    };
    this.api = new Api();
  };

  updateIndex(selectedIndex) {
    var index = '';
    if (selectedIndex == 0) {
      index = 'day';
    }
    else if (selectedIndex == 1) {
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

  componentDidMount= () => {
    // AsyncStorage.getItem("userid").then((value) => {
    //     this.setState({userid: parseInt(value)});
    // }).done();
    this.setState({userid: 1});
}

  _renderItem = ({item}) => {
    return <PortfolioItem 
      ticker={item.ticker}
      numShares={item.numShares}
      price={item.price}
      navigation={this.props.navigation} />
  };

  _setLoading = () => {
    this.setState({isLoading: true});
  }

  render() {
    console.log('rendering profile...');
    if (this.state.isLoading) {
      this.api.getPortfolios((portfolios) => {
        console.log(portfolios);
        this.setState({portfolios, isLoading: false});
      });

      return <LoadingProfile />;
    }
    else {
      if (this.state.portfolios.length == 0) {
        return <NoPortfoliosProfile 
                navigation={this.props.navigation}
                update={this._setLoading.bind(this)}
                />;
      }
      else {
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
                <StockChart range={this.state.range} ticker={'AMD'}/>
                <ButtonGroup
                  onPress={this.updateIndex.bind(this)}
                  selectedIndex={this.state.selectedIndex}
                  buttons={['D', 'W', 'M', 'Y']}
                  containerStyle={{flex: 0.3}}
                  textStyle={{color: colors.white}}
                  buttonStyle={{backgroundColor: colors.grey}}
                  selectedButtonStyle={{backgroundColor: colors.white}}
                />
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
  }
}