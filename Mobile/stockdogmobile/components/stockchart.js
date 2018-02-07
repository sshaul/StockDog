import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      isLoading: true,
      xData: [],
      yData: []
    };
    this.getData('day');
  };

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.range);
  }
  
  getData(range) {
    console.log('range changed!');
      var newData = [];
      var newXData = [];
      var newYData = [];
      var baseurl = 'http://localhost:5005/api/stock';
      var url = '';
      if (range == 'day')
        url = baseurl + '/AMD/history/day';
      else if (range == 'week'){
        url = baseurl + '/AMD/history/week';
      }
      else if (range == 'month')
        url = baseurl + '/AMD/history/month';
      else
        url = baseurl + '/AMD/history/year';
      fetch(url, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        responseJson.forEach(element => {
          var str = element.time;
          var date = "";
          if (range == 'day') {
            console.log('day');
            str = element.time.split(" ")[1];
            date = str.split(":")[0] + ":" + str.split(":")[1];
            console.log(date);
          }
          else if (range == 'week') {
            var d = new Date(str.split(" ")[0]);
            var mo = d.toLocaleString("en-us", {month: "short"});
            var day = d.toLocaleString("en-us", {day: "numeric"});
            var time = str.split(" ")[1];
            date = mo + " " + day + " " + time;
          }
          else {
            var d = new Date(element.time);
            var month = d.toLocaleString("en-us", {month: "short"});
            var day = d.toLocaleString("en-us", {day: "numeric"});
            date = month + " " + day;
          }
          newXData.push(date);
          newYData.push(parseFloat(element.price));
        });
        this.setState({xData: newXData, yData: newYData, isLoading: false});
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
                type: 'category',
                categories: this.state.xData,
                gridLineColor: colors.dark,
                tickInterval: 15,
                labels: {
                    enabled: true,
                    formatter: function() {
                      // console.log(this.value);
                      // return this.value.split(":")[0];
                      return this.value
                    },
                    rotation: 0,
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
                    return this.x + '<br/>' +
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
                data: this.state.yData
            }],
            plotOptions: {
              series: {
                  color: colors.bright,
                  marker: {
                    enabled: false
                  }
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
      <ChartView style={{height:300, width: 350}} config={conf} options={options}></ChartView>
    );
  }

  render() {
    console.log('rendering chart');
    return (
      <View>
        {this.createChart()}
      </View>
    );
  }
}