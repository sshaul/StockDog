import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import ChartView from 'react-native-highcharts';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userId : "",
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
      var newData = [];
    //   var url = 'http://localhost:5000/api/stock/AMD/history/day';
      var url = 'http://198.199.100.209:6000/api/stock/AMD/history/day';
      fetch(url, {
        method: 'GET'
      }).then((response) => response.json())
      .then((responseJson) => {
        responseJson.forEach(element => {
          var date = new Date(element.epochTime * 1000);
          newData.push([date, parseFloat(element.price)]);
          newData.sort(function (date1, date2) {
            // This is a comparison function that will result in dates being sorted in
            // ASCENDING order. As you can see, JavaScript's native comparison operators
            // can be used to compare dates. This was news to me.
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
          });
        });
        this.setState({data: newData, isLoading: false});
      }).catch((error) => console.error(error));
  }

  createChart() {
    // console.log(this.state.data);
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
                    enabled: false
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
                    return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
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
            {this.createChart()}
        </View>
        <TouchableOpacity onPress={this.viewStock.bind(this)}>
          <Text> AMD stock </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}