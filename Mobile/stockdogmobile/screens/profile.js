import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, ButtonGroup } from 'react-native-elements';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import StockChart from '../components/stockchart';
import PortfolioItem from '../components/portfolioItem';
import Api from '../api';
import LoadingProfile from '../components/loadingProfile';
import NavBar from '../components/navbar';
import Drawer from 'react-native-drawer';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isPortfolioLoading: true,
      portfolioid: null,
      range: 'day',
      portfolios: [],
      portfolioStocks: [],
      portfolioWatchlist: [],
    };
    this.api = new Api();
  };

  static onEnterPortfolio = () => {
    Actions.refresh({
      enterTime: new Date()
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.enterTime !== nextProps.enterTime) {
      this.api.getPortfolios((portfolios) => {
        if (portfolios.length == 0) {
          Actions.replace('noportfolios', {});
        }
        else {
          AsyncStorage.getItem('currPortfolio').then((value) => {
            if (value === null) {
              this.setState({portfolios, isLoading: false, isPortfolioLoading: true, portfolioid: portfolios[0].id});
              AsyncStorage.setItem('currPortfolio', ''+ portfolios[0].id);
            }
            else {
              this.setState({portfolios, isLoading: false, isPortfolioLoading: true, portfolioid: value});
            }
            
          })
        }
      });
    }
  }

  componentDidMount() {
    this.api.getPortfolios((portfolios) => {
      if (portfolios.length == 0) {
        Actions.replace('noportfolios', {});
      }
      else {
        AsyncStorage.getItem('currPortfolio').then((value) => {
          if (value === null) {
            this.setState({portfolios, isLoading: false, portfolioid: portfolios[0].id});
            AsyncStorage.setItem('currPortfolio', ''+ portfolios[0].id);
          }
          else {
            this.setState({portfolios, isLoading: false, portfolioid: value});
          }
          
        })
      }
    });
  }

  _renderItem = ({item}) => {
    return <PortfolioItem 
      ticker={item.ticker}
      numShares={item.shareCount}
      price={item.avgCost}
      navigation={this.props.navigation} />
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingProfile />;
    }
    else {
      var currPort = this.state.portfolios.find(x => x.id === parseInt(this.state.portfolioid));
      if (this.state.isPortfolioLoading) {
        this.api.getPortfolioStocks((stocks) => {
          if (stocks.length === 1 && stocks[0].ticker === null) {
            stocks = []
          }
          var idx = 0;
          stocks.forEach((stock) => {
            stock.key = idx;
            idx++;
          });
          this.api.getWatchlistStocks((watching) => {
            watching.forEach((watch)=> {
              watch.key = idx;
              idx++;
            });
            this.setState({portfolioStocks: stocks, portfolioWatchlist: watching,
              isPortfolioLoading: false, isLoading: false});
          });
          
        });

        return (
          <View style={containers.profileGeneral}>
            <NavBar />
            <View style={{flex: 1, alignItems: 'center'}}>
              <ScrollView style={{flex: 1}}>
                <StockChart range={this.state.range} portfolio={true} league={currPort.league}/>
                <View style={{flex: 0.3}}>
                  <Text style={text.profileLabels}>Portfolio</Text>
                  <Text style={text.smallPortfolioText}>Loading...</Text>
                  <Text style={text.profileLabels}>Watchlist</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      }

      var portfolio = this.state.portfolioStocks.length > 0 ? (
            <FlatList
              style={{flex: 1}}
              data={this.state.portfolioStocks}
              renderItem={this._renderItem}
            />
        ) : <Text style={text.smallPortfolioText}>No stocks owned. </Text>;

      var watchlist = this.state.portfolioWatchlist.length > 0 ? (
          <FlatList
            style={{flex: 1}}
            data={this.state.portfolioWatchlist}
            renderItem={this._renderItem}
          />
      ) : <Text style={text.smallPortfolioText}>No stocks watched. </Text>;

      return (
        <View style={containers.profileGeneral}>
          <NavBar />
          <View style={{flex: 0.9, alignItems: 'center'}}>
            <ScrollView style={{flex: 1}}>
              <View style={containers.feedTitle}>
                <Text style={text.title}>{currPort.league}</Text>
              </View>
              <StockChart range={this.state.range} portfolio={true} league={currPort.league}/>
              <View style={{flex: 0.3}}>
                <Text style={text.profileLabels}>Portfolio</Text>
                {portfolio}
                <Text style={text.profileLabels}>Watchlist</Text>
                {watchlist}
              </View>
              <View style={{height: 20}}/>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}