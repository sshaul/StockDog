import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, ScrollView } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Icon from 'react-native-vector-icons/Feather';
import Api from '../api';
import SpinningLoader from './spinningloader';

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      isLoading: true,
      xData: [],
      yData: []
    };
    this.api = new Api();
  };

  componentDidMount() {
    this.getData('day');
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps.range);
  }
  
  getData(range) {
    if (this.props.portfolio) {
      this.api.getPortfolioData((newXData, newYData) => {
        if (true) {
          this.setState({noData: true, isLoading: false});
        }
        else {
          this.setState({xData: newXData, yData: newYData, isLoading: false});
        }
      })
      
      return;
    }
    else {
      this.api.getChartData(this.props.ticker, range, (newXData, newYData) => {
        this.setState({xData: newXData, yData: newYData, isLoading: false});
      });
    };
  }

  createChart() {
    var intervals = parseInt(this.state.xData.length / 5);
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
                tickInterval: intervals,
                labels: {
                    enabled: true,
                    formatter: function() {
                      if (this.value.split(" ").length > 2) {
                        return this.value.split(" ")[0] + " " + this.value.split(" ")[1];
                      }
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

  profileHeader = () => {
    if (this.props.portfolio) {
      return <Text style={text.money}>{this.props.league}</Text>
    }
  }

  render() {
    const lastelt = this.state.yData[this.state.yData.length - 1];
    if (this.state.isLoading) {
      return (
        <View style={{height:300, width: 350, justifyContent: 'center', alignItems: 'center'}}>
          <SpinningLoader />
        </View>
      );
    }
    if (this.state.noData) {
      return (
        <View style={{height:300, width: 350, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={text.money}>{this.props.league}</Text>
        </View>
      )
    }
    return (
      <View style={containers.chart}>
        {this.profileHeader()}
        <Text style={text.money}>${lastelt}</Text>
        {this.createChart()}
      </View>
    );
  }
}