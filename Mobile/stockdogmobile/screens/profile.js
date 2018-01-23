import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import {StockLine} from 'react-native-pathjs-charts';
import ChartView from 'react-native-highcharts';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : ""
    };
  }
  createChart() {
    var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg,
                marginRight: 10,
                backgroundColor: colors.dark,
                events: {
                    load: function () {
 
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: colors.white
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
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
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
 
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
                        });
                    }
                    return data;
                }())
            }]
        };
 
    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };
 
    return (
      <ChartView style={{height:300}} config={conf} options={options}></ChartView>
    );
  }

  viewStock() {
    console.log('here');
    this.props.navigation.navigate('Stock', {name: 'AMD'})
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <View style={containers.iconHeaders}>
        </View>
        <View style={containers.chart}>
            <Text style={text.money}>$20.05</Text>
            {/* <StockLine 
                data={this.getData()} 
                options={this.getOptions()}
                xKey='x'
                yKey='y' /> */}
            {this.createChart()}
        </View>
        <TouchableOpacity onPress={this.viewStock.bind(this)}>
          <Text> AMD stock </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}