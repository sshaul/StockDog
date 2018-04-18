import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import StockChart from '../components/stockchart';
import PortfolioItem from '../components/portfolioItem';
import Api from '../api';
import LoadingProfile from '../components/loadingProfile';
import AddPortfolioModal from '../components/addportfoliomodal';
import NavBar from '../components/navbar';
import Drawer from 'react-native-drawer';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isPortfolioLoading: true,
      portfolioid: 1,
      selectedIndex: 0,
      range: 'day',
      portfolios: [],
      portfolioStocks: [],
      portfolioWatchlist: [],
      isModalVisible: false
    };
    this.api = new Api();
  };

  componentDidMount() {
    this.api.getPortfolios((portfolios) => {
      if (portfolios.length == 0) {
        Actions.replace('noportfolios', {});
      }
      else {
        this.setState({portfolios, isLoading: false});
      }
    });
  }

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

  _openModal = () => {
    this.setState({isModalVisible: true});
  }

  _closeModal = () => {
    this.setState({isModalVisible: false, isLoading: true});
  }

  _renderItem = ({item}) => {
    return <PortfolioItem 
      ticker={item.ticker}
      numShares={item.shareCount}
      price={item.avgCost}
      navigation={this.props.navigation} />
  };

  render() {
    console.log(this.state);
    if (this.state.isLoading) {
      return <LoadingProfile />;
    }
    else {
      if (this.state.isPortfolioLoading) {
        this.api.getPortfolioStocks(this.state.portfolios[0].id, (stocks) => {
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
                <StockChart range={this.state.range} portfolio={true}/>
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
                  <Text style={text.smallPortfolioText}>Loading...</Text>
                  <Text style={text.profileLabels}>Watchlist</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      }
      return (
        <View style={containers.profileGeneral}>
          <NavBar />
          <View style={{flex: 1, alignItems: 'center'}}>
            <ScrollView style={{flex: 1}}>
              <StockChart range={this.state.range} portfolio={true}/>
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
                  data={this.state.portfolioStocks}
                  renderItem={this._renderItem}
                />
                <Text style={text.profileLabels}>Watchlist</Text>
                <FlatList
                  style={{flex: 1}}
                  data={this.state.portfolioWatchlist}
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