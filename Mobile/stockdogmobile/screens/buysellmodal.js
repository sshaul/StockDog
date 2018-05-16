import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import Modal from 'react-native-modal';
import RoundInput from '../components/roundinput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';

export default class BuySellModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      price: '',
      transactionComplete: false,
      errorMessage: ''
    };
    this.api = new Api();
  }

  buysellstock() {
    var props = this.props.navigation.state.params;
    this.api.manageStock(props.modalType, props.ticker, parseInt(this.state.amount), 
      parseFloat(this.state.price), props.id, (res) => {
        if (res.status_code === 400) {
          this.setState({errorMessage: res.message});
        }
        else {
          this.setState({transactionComplete: true});
        }
      });
  }

  onchangeamount(amount) {
    this.setState({
        amount: amount.replace(/^[a-zA-Z]*$/g, ''),
    });
  }

  onchangeprice(price) {
    this.setState({
      price: price.replace(/\s^[a-zA-Z]*$/g, ''),
  });
  }

  render() {
    var content;
    var props = this.props.navigation.state.params;
    var errorMessage;
    if (this.state.errorMessage) {
      errorMessage = (<Text style={text.joinLeagueWarning}> 
        {this.state.errorMessage}
      </Text>);
    }
    if (this.state.transactionComplete) {
      if (this.props.navigation.state.params.modalType == 'buy') {
        content = (<View style={containers.innerModal}>
          <View style={containers.successMessage}>
            <Text style={text.profileLabels}>Buy successful!</Text>
          </View>
        </View>);
      }
      else if (this.props.navigation.state.params.modalType == 'sell') {
        content = (<View style={containers.innerModal}>
          <Text style={text.profileLabels}>Sell successful!</Text>
        </View>);
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
        {errorMessage}
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
