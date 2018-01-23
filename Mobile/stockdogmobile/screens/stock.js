import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Icon from 'react-native-vector-icons/Feather';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import WideButton from '../components/widebutton';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.state.params);
    this.state = { 
      userId : ""
    };
  }

  getData() {
    // fetch('http://localhost:5000/api/stock/AMD/history/day', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // });
    return [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={containers.chartOut}>
          <Text style={text.money}>AMD</Text>
          <Text style={text.money}>$20.05</Text>
          <View style={containers.chartIn}>
            <LineChart
                  style={ { height: 200, width: 350 } }
                  dataPoints={ this.getData() }
                  fillColor={ 'yellow' }
                  shadowOffset={3}
                  showGrid={false}
                  svg={ {
                      stroke: colors.bright,
                      strokeWidth: 3
                  } }
                  shadowSvg={ {
                      stroke: colors.bright,
                      strokeWidth: 3,
                  } }
                  contentInset={ { top: 20, bottom: 20 } }
                  curve={shape.curveLinear}
              />
            </View>
        </View>
        <View style={containers.buttons}>
          <TouchableOpacity
            style={elements.buyButton}
            onPress={this.props.onpress}
            >
            <Text style={text.loginButton}>BUY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={elements.sellButton}
            onPress={this.props.onpress}
            >
            <Text style={text.loginButton}>SELL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}