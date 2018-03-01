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

export default class AddPortfolioModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.api = new Api();
  }

  onpress = () => {
    this.api.createNewPortfolio((response) => {
      this.props._close();
    });
  }

  render() {
    return (
      <Modal
        isVisible={this.props.visibility}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={this.props._close}>
        <View style={containers.outerModal}>
          <View style={containers.modalHeaders}>
            <TouchableOpacity onPress={this.props._close}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <View style={containers.innerModal}>
            <RoundInput type="Name"/>
            <WideButton type="portfolio" onpress = {this.onpress}/>
          </View>
        </View>
      </Modal>
    );
  }
};
