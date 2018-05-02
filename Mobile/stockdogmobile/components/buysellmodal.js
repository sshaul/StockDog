import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Lightbox from './baseLightbox';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Modal from 'react-native-modal';
import RoundInput from './roundinput';
import WideButton from './widebutton';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class BuySellModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      price: '',
      transactionComplete: false
    };
    this.api = new Api();
  }

  buysellstock() {
    var props = this.props.navigation.state.params;
    this.api.manageStock(props.type, props.ticker, parseInt(this.state.amount), 
      parseFloat(this.state.price), props.id, (res) => {
        this.setState({transactionComplete: true});
      });
  }

  onchangeamount(amount) {
    this.setState({amount});
  }

  onchangeprice(price) {
    this.setState({price});
  }

  render() {
    var content;
    var props = this.props.navigation.state.params;
    if (this.state.transactionComplete) {
      if (this.props.navigation.state.params.modalType == 'buy') {
        content = <Text style={text.profileLabels}>Buy successful!</Text>;
      }
      else if (this.props.navigation.state.params.modalType == 'sell') {
        content = <Text style={text.profileLabels}>Sell successful!</Text>;
      }
    }
    else {
      content = (<View style={containers.innerModal}>
        <RoundInput 
          type="Price" 
          onchange={this.onchangeprice.bind(this)} 
          value={this.state.price}/>
        <RoundInput 
          type="Amount" 
          onchange={this.onchangeamount.bind(this)} 
          value={this.state.amount}/>
        <WideButton type={props.modalType} onpress={this.buysellstock.bind(this)}/>
      </View>);
    }
    return (
      <Lightbox verticalPercent={0.7} horizontalPercent={0.8}>
        <View style={containers.outerModal}>
          <View style={containers.modalHeaders}>
            <TouchableOpacity onPress={()=>{Actions.pop()}}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </Lightbox>
    );
  }
};
