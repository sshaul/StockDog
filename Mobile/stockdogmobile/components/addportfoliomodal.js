import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
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
    this.state = {
      name: "",
      buyPower: "",
      startDate: "",
      endDate: ""
    };
    this.api = new Api();
  }

  getCurrDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10) {
        dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }

  onpress = () => {
    this.api.createNewLeague(
      this.state.name, 
      this.state.buyPower,
      this.state.startDate,
      this.state.endDate, (response) => {
      this.props._close();
    });
  }

  render() {
    var disabled = !(this.state.name && 
      this.state.buyPower && 
      this.state.startDate && 
      this.state.endDate)
    return (
      <Modal
        isVisible={this.props.visibility}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={this.props._close}>
        <View style={containers.addGroupOuterModal}>
          <View style={containers.addGroupModalHeader}>
            <TouchableOpacity onPress={this.props._close}>
              <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
          </View>
          <View style={containers.addGroupInnerModal}>
            <RoundInput 
              type="Name" 
              onchange={(name) => this.setState({name})} 
              value={this.state.name}/>
            <RoundInput 
              type="Buying Power" 
              onchange={(buyPower) => this.setState({buyPower})} 
              value={this.state.buyPower}/>
            {/* <RoundInput 
              type="Start Date" 
              onchange={(startDate) => this.setState({startDate})} 
              value={this.state.startDate}/> */}
            <DatePicker
              style={elements.roundedInput}
              date={this.state.startDate}
              mode="date"
              placeholder="Select start date"
              format="MM/DD/YYYY"
              minDate={this.getCurrDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(startDate) => {this.setState({startDate})}}
            />
            {/* <RoundInput 
              type="End Date" 
              onchange={(endDate) => this.setState({endDate})} 
              value={this.state.endDate}/> */}
            <DatePicker
              style={elements.roundedInput}
              date={this.state.endDate}
              mode="date"
              placeholder="Select end date"
              format="MM/DD/YYYY"
              minDate={this.getCurrDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(endDate) => {this.setState({endDate})}}
            />
            <WideButton disabled={disabled} type="portfolio" onpress = {this.onpress}/>
          </View>
        </View>
      </Modal>
    );
  }
};
