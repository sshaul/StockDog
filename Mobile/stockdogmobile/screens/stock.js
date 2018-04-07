import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import WideButton from '../components/widebutton';
import StockChart from '../components/stockchart';
import BuySellModal from '../components/buysellmodal';
import Api from '../api';

export default class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : "",
      data: [],
      isLoading: true,
      selectedIndex: 0,
      range: 'day',
      isModalVisible: false,
      modalType: 'buy',
      modalVisible: false,
      addedWatch: false
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

  _openBuyModal = () => {
    this.setState({isModalVisible: true, modalType: 'buy'});
  }

  _openSellModal = () => {
    this.setState({isModalVisible: true, modalType: 'sell'});
  }

  _closeModal = () => {
    this.setState({isModalVisible: false});
  }

  addToWatchlist = () => {
    this.api.addToWatchlist(this.props.navigation.state.params.ticker, () => {
      this.setState({addedWatch: true});
    });
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
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='chevron-down' size={48} color='grey' />
          <Icon name='settings' size={30} color='white' />
        </View>
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
        <BuySellModal
          visibility={this.state.isModalVisible}
          _close={this._closeModal.bind(this)}
          type={this.state.modalType}
          ticker={this.props.navigation.state.params.ticker}
          id={this.props.navigation.state.params.pid}
          />
      </View>
    );
  }
}