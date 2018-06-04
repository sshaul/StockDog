import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, SearchBar, ListItem, Avatar } from 'react-native-elements';
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
      transactions: [],
      name: ''
    };

    this.api = new Api();
  }

  static onEnterFeed = () => {
    Actions.refresh({
      enterTime: new Date()
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.enterTime !== nextProps.enterTime) {
      this.api.getLeagueInfo((leagueInfo) => {
        this.api.getTransactions((transactions) => {
          if (transactions.length === 0) {
            this.setState({noTransactions: true, name: leagueInfo.name});
          }
          else {
            this.setState({transactions, name: leagueInfo.name});
          }
        });
      });
    }
  }

  componentDidMount() {
    this.api.getTransactions((transactions) => {
      this.api.getLeagueInfo((leagueInfo) => {
        this.api.getTransactions((transactions) => {
          if (transactions.length === 0) {
            this.setState({noTransactions: true, name: leagueInfo.name});
          }
          else {
            this.setState({transactions, name: leagueInfo.name});
          }
        });
      });
    });
  }

  keyExtractor = (item, index) => index

  _renderItem(item) {

    // Building title statement
    var activity = item.item.isBuy ? 'bought ' : 'sold ';
    var shares = item.item.shareCount > 1 ? ' shares of ' : ' share of ';

    // Setting text size
    var textStyle = text.smallIconText;
    if (item.item.ticker.length === 3) {
      textStyle = text.medIconText;
    }
    else if (item.item.ticker.length > 3) {
      textStyle = text.largeIconText;
    }

    var title = item.item.nickname + ' ' + activity + item.item.shareCount + shares + item.item.ticker + ' at $' + item.item.sharePrice;

    var avatar = <Avatar 
                  rounded 
                  title={item.item.ticker}
                  onPress={() => this.toStock(item.item.ticker)}
                  containerStyle={{width: 50, height: 50}}
                  overlayContainerStyle={{backgroundColor: colors.grey, width: 50, height: 50, borderRadius: 25}}
                  titleStyle={textStyle} 
                  activeOpacity={0.7}/>

    return (
      <ListItem
        key={item.item.id}
        containerStyle={containers.activity}
        title={title}
        titleStyle={text.activityTitle}
        titleNumberOfLines={2}
        subtitle={item.item.datetime}
        avatar={avatar}
        hideChevron
      />
    );
  }

  toStock(ticker) {
    AsyncStorage.getItem('currPortfolio').then((value) => {
      Actions.stock({ticker: ticker, pid: parseInt(value)});
    });
  }

  render() {
    const transactions = this.state.noTransactions ?
      <View style={containers.activity}> 
        <Text style={text.noActivity}>No activity yet.</Text>
      </View> : 
      <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.transactions}
            renderItem={this._renderItem.bind(this)}/>;
    
    return (
      <View style={containers.profileGeneral}>
        <NavBar />
        <View style={containers.feedTitle}>
          <Text style={text.title}>{this.state.name}</Text>
        </View>
        <View style={containers.feed}>
          {transactions}
        </View>
      </View>
    );
  }
}