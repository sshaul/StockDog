import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import AddPortfolioModal from '../components/addportfoliomodal';

export default class NoPorfoliosProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };

    // this.api = new Api();
  }

  _openModal = () => {
    this.setState({isModalVisible: true});
  }

  _closeModal = () => {
    this.setState({isModalVisible: false});
    this.props.update();
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity 
            style={{justifyContent: 'center', alignItems: 'center'}}
            onPress={this._openModal.bind(this)}
            >
            <Text style={text.profileLabels}> Add a portfolio </Text>
            <Icon name='plus' size={48} color='white' />
          </TouchableOpacity>
        </View>
        <AddPortfolioModal
          visibility={this.state.isModalVisible}
          _close={this._closeModal.bind(this)}
          />
      </View>
    );
  }
}