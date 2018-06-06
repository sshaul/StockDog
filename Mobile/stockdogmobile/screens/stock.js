import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import WideButton from '../components/widebutton';
import StockChart from '../components/stockchart';
import Api from '../api';
import NavBar from '../components/navbar';

export default class Stock extends Component {
constructor(props) {
   super(props);
   this.state = {
      userId : "",
      data: [],
      isLoading: true,
      selectedIndex: 0,
      range: 'day',
      addedWatch: false,
      buypower: -1,
      shares: 0
   };

   this.api = new Api();
};

componentDidMount() {
   var props = this.props.navigation.state.params;
   this.api.getPortfolioBuyPower((bp) => {
      this.api.getPortfolioStocks((stocks) => {
         const stock = stocks.find((element) => {return element.ticker === props.ticker;});
         if (stock != undefined) {
            shares = stock.shareCount;
         }
         else {
            shares = 0
         }
         this.api.getWatchlistStocks((watchlist) => {
            var item = watchlist.find(x => x.ticker === props.ticker)
            if (item !== undefined) {
               this.setState({addedWatch: true, watchlistId: item.id, buypower: bp, shares: shares});
            }
            else {
               this.setState({buypower: bp, shares: shares});
            }
         });
      });
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

_openBuyModal = () => {
   Actions.buysellmodal({modalType: 'buy', ticker: this.props.navigation.state.params.ticker, buypower: this.state.buypower});
}

_openSellModal = () => {
   Actions.buysellmodal({modalType: 'sell', ticker: this.props.navigation.state.params.ticker, shares: this.state.shares});
}

addToWatchlist = () => {
   if (this.state.addedWatch) {
      this.api.removeFromWatchlist(this.state.watchlistId, () => {
      this.setState({addedWatch: false});
      })
   }
   else {
      this.api.addToWatchlist(this.props.navigation.state.params.ticker, () => {
      this.setState({addedWatch: true});
      });
   }
};

render() {
   var watching;
   if (this.state.addedWatch) {
      watching = (<TouchableOpacity onPress={this.addToWatchlist}>
                  <Icon name='eye-off' size={30} color='white' />
                  </TouchableOpacity>);
   }
   else {
      watching = (<TouchableOpacity onPress={this.addToWatchlist}>
                  <Icon name='eye' size={30} color='white' />
                  </TouchableOpacity>);
   }

   return (
      <View style={containers.profileGeneral}>
      <NavBar stock={true}/>
      <View style={containers.chart}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingLeft: 10}}>
               <Text style={text.money}>{this.props.navigation.state.params.ticker}</Text>
               {watching}
            </View>
            <StockChart range={this.state.range} ticker={this.props.navigation.state.params.ticker}/>
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
            onPress={this._openBuyModal}
            >
            <Text style={text.loginButton}>BUY</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={elements.sellButton}
            onPress={this._openSellModal}
            >
            <Text style={text.loginButton}>SELL</Text>
            </TouchableOpacity>
         </View>
      </View>
      </View>
   );
}
}