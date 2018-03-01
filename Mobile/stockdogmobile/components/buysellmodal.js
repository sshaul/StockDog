import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
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

  componentDidMount() {
    console.log('mount');
  }

  buysellstock() {
    this.api.manageStock(this.props.type, this.props.ticker, parseInt(this.state.amount), 
      parseFloat(this.state.price), this.props.id, (res) => {
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
    console.log(this.state);
    var content;
    if (this.state.transactionComplete) {
      if (this.props.type == 'buy') {
        content = <Text style={text.profileLabels}>Buy successful!</Text>;
      }
      else if (this.props.type == 'sell') {
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
        <WideButton type={this.props.type} onpress={this.buysellstock.bind(this)}/>
      </View>);
    }
    return (
      <Modal
        isVisible={this.props.visibility}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={this.props._close}
        onShow={()=>this.setState({transactionComplete: false, amount: '0', price: '0'})}>
        <View style={containers.outerModal}>
          <View style={containers.modalHeaders}>
            <TouchableOpacity onPress={this.props._close}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </Modal>
    );
  }
};
