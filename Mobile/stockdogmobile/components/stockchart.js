import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import text from '../style/text';
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
      xData: [],
      yData: [1, 2, 3, 6, 4, 8],
      selectedIndex: 0,
    };

  };

  // componentDidMount() {
  //   this.getData('day');
  // }

  // componentWillReceiveProps(nextProps) {
  //   this.getData(nextProps.range);
  // }

  // updateIndex(selectedIndex) {
  //   var index = '';
  //   if (selectedIndex == 0) {
  //     index = 'day';
  //   }
  //   else if (selectedIndex == 1) {
  //     index = 'week';
  //   }
  //   else if (selectedIndex == 2) {
  //     index = 'month';
  //   }
  //   else {
  //     index = 'year';
  //   }
  //   this.setState({selectedIndex, range: index});
  // }
  
  // getData(range) {
  //   if (this.props.portfolio) {
  //     this.api.getPortfolioData((newXData, newYData) => {
  //       this.setState({xData: newXData, yData: newYData, isLoading: false});
  //     });
  //   }
  //   else {
  //     this.api.getChartData(this.props.ticker, range, (newXData, newYData, error) => {
  //       this.setState({xData: newXData, yData: newYData, isLoading: false});
  //     });
  //   };
  // }

  createChart() {
    var intervals = parseInt(this.state.xData.length / 5);
    var Highcharts='Highcharts';
    var conf={
            chart: {
                type: 'line',
                animation: Highcharts.svg,
                marginRight: 10,
                lineColor: colors.grey,
                backgroundColor: colors.grey,
                gridLineColor: colors.grey
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                categories: this.state.xData,
                gridLineColor: colors.grey,
                tickInterval: intervals,
                tickColor: colors.white,
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
                lineWidth: 1
            },
            yAxis: {
                title: {
                    text: ''
                },
                lineColor: colors.white,
                lineWidth: 1,
                gridLineColor: colors.grey,
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
                    if (this.x.split(" ").length > 1) {
                      return this.x.split(" ")[0] + ' ' + this.x.split(" ")[1] + '<br/>' +
                        '$' + Highcharts.numberFormat(this.y, 2);
                    }
                    return this.x + '<br/>' +
                        '$' + Highcharts.numberFormat(this.y, 2);
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
    const lastelt = this.state.yData[this.state.yData.length - 1];
    var moneyText = '';
    if (lastelt) {
      moneyText = '$' + lastelt;
    }

    if (this.state.isLoading) {
      return (
        <View style={containers.chartContainer}>
          <SpinningLoader />
        </View>
      );
    }
    return (
      <View>
        <View style={containers.chart}>
          <Text style={text.money}>{moneyText}</Text>
          {this.createChart()}
          {/* <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
            buttons={['D', 'W', 'M', 'Y']}
            containerStyle={{flex: 0.3}}
            textStyle={{color: colors.white}}
            buttonStyle={{backgroundColor: colors.grey}}
            selectedButtonStyle={{backgroundColor: colors.white}}
          /> */}
        </View>
      </View>
    );
  }
}