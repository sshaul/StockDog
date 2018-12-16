import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';
import Api from '../api';
import SpinningLoader from './spinningloader';

export default class StockChart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      isLoading: true,
      xData: [1, 2, 3, 4, 5, 6],
      yData: [1, 2, 3, 6, 4, 8],
      selectedIndex: 0,
    };

  };

  createChart() {
    var conf={
            chart: {
                type: 'spline',
                marginRight: 10,
                lineColor: colors.white,
                backgroundColor: 'transparent',
                gridLineColor: colors.white
            },
            title: { text: '' },
            xAxis: {
              visible: false
            },
            yAxis: {
                title: { text: '' },
                lineWidth: 0,
                gridLineColor: colors.grey,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: colors.white
                }],
                labels: {
                  style: {
                    color: colors.white
                  }
                },
            },
            tooltip: {
                formatter: function () {
                    // if (this.x.split(" ").length > 1) {
                    //   return this.x.split(" ")[0] + ' ' + this.x.split(" ")[1] + '<br/>' +
                    //     '$' + Highcharts.numberFormat(this.y, 2);
                    // }
                    // return this.x + '<br/>' +
                    //     '$' + Highcharts.numberFormat(this.y, 2);
                    return this.x + ', ' + this.y;
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
                  color: colors.white,
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
      <ChartView style={containers.chart} config={conf} options={options}></ChartView>
    );
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={containers.chartContainer}>
          <SpinningLoader />
        </View>
      );
    }
    return (
      <View>
        <View style={containers.chartContainer}>
          {this.createChart()}
        </View>
      </View>
    );
  }
}