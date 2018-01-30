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
import Chart from 'react-native-chartjs';
import ChartView from 'react-native-highcharts';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      data: [],
      isLoading: true
    };
  };

  componentDidMount() {
    // generate an array of random data
    var newData = [];

    // var url = 'http://localhost:5000/api/stock/AMD/history/day';
    var url = 'http://198.199.100.209:5005/api/stock/AMD/history/day';
    fetch(url, {
      method: 'GET'
    }).then((response) => response.json())
    .then((responseJson) => {
      responseJson.forEach(element => {
        var date = new Date(element.epochTime * 1000);
        newData.push([element.epochTime * 1000, parseFloat(element.price)]);
        // newData.sort(function (date1, date2) {
        //   if (date1 > date2) return 1;
        //   if (date1 < date2) return -1;
        //   return 0;
        // });
      });
      console.log(newData);
      this.setState({data: newData, isLoading: false});
    }).catch((error) => console.error(error));
  };

  createChart() {
    var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'line',
                animation: Highcharts.svg,
                marginRight: 10,
                lineColor: colors.grey,
                backgroundColor: colors.dark,
                gridLineColor: colors.dark
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                gridLineColor: colors.dark,
                labels: {
                    enabled: true,
                    style: {
                      color: colors.white,
                      fontSize: '11px'
                    }
                },
                lineColor: colors.white,
                lineWidth: 2
            },
            yAxis: {
                title: {
                    text: ''
                },
                lineColor: colors.white,
                lineWidth: 2,
                gridLineColor: colors.dark,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: colors.white
                }],
                labels: {
                    enabled: false
                }
            },
            tooltip: {
                formatter: function () {
                    return '<div style="text-align:center;"><b>' + Highcharts.dateFormat('%H:%M', this.x) + '</b>' + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Price',
                data: this.state.data
            }],
            plotOptions: {
              series: {
                  color: colors.bright
              }
            },
            credits: {
              enabled: false
            }
        };
 
    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
    };
 
    return (
      <ChartView style={{height: 300, width: '100%'}} config={conf} options={options}></ChartView>
    );
  };

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
          <Icon name='user' size={30} color='white' />
          <Icon name='settings' size={30} color='white' />
        </View>
        <View style={containers.chart}>
            <Text style={text.money}>AMD</Text>
            <Text style={text.money}>$20.05</Text>
            {this.createChart()}
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