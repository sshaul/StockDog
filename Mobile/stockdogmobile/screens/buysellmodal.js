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
      transactionComplete: false,
      errorMessage: '',
    };
    this.api = new Api();
  }

  buysellstock() {
    var props = this.props.navigation.state.params;
    if (/[a-zA-Z]/.test(this.state.amount)) {
      alert("Invalid amount value. Please enter numbers only.");
    }
    else {
      this.api.manageStock(props.modalType, props.ticker, parseInt(this.state.amount), 
      (res) => {
        if (res.status_code === 400) {
          alert (res.message);
        }
        else {
          this.setState({transactionComplete: true});
        }
      });
    }
    
  }

  onchangeamount(amount) {
    this.setState({
        amount: amount.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{1,}/g,"")
    });
  }

  render() {
    const disabled = !(this.state.amount.length > 0);

    var content;
    var props = this.props.navigation.state.params;
    if (this.state.transactionComplete) {
      if (props.modalType === 'buy') {
        content = (<View style={containers.innerModal}>
          <View style={containers.successMessage}>
            <Text style={text.profileLabels}>Buy successful!</Text>
            <View style={containers.check}>
              <Icon name='check-circle' size={48} color='white' />
            </View>
          </View>
        </View>);
      }
      else if (props.modalType === 'sell') {
        content = (<View style={containers.innerModal}>
          <View style={containers.successMessage}>
            <Text style={text.profileLabels}>Sell successful!</Text>
            <View style={containers.check}>
              <Icon name='check-circle' size={48} color='white' />
            </View>
          </View>
        </View>);
      }
    }
    else {
      if (props.modalType === 'buy') {
        content = (<View style={containers.innerModal}>
          <Text style={[text.profileLabels, {paddingBottom: 10, paddingTop: 10}]}>Buy power: {props.buypower}</Text>
          <RoundInput 
            type="Amount" 
            onchange={this.onchangeamount.bind(this)} 
            value={this.state.amount}/>
          <WideButton type={props.modalType} onpress={this.buysellstock.bind(this)} disabled={disabled}/>
        </View>);
      }
      else if (props.modalType === 'sell') {
        content = (<View style={containers.innerModal}>
          <Text style={[text.profileLabels, {paddingBottom: 10, paddingTop: 10}]}>You own {props.shares} shares</Text>
          <RoundInput 
            type="Amount" 
            onchange={this.onchangeamount.bind(this)} 
            value={this.state.amount}/>
          <WideButton type={props.modalType} onpress={this.buysellstock.bind(this)} disabled={disabled}/>
        </View>);
      }
      
    }
    return (
      <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
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
