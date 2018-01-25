import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import sortJsonArray from 'sort-json-array';

class Stock extends Component {
   constructor() {
      super();

      this.state = {
         data: {
            labels: [],
            datasets: [
               {
                  fill: false,
                  lineTension: 0,
                  borderColor: 'rgb(99, 206, 194)',
                  borderCapStyle: 'butt',
                  borderJoinStyle: 'miter',
                  borderWidth: 4,
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointHoverRadius: 10,
                  pointHoverBackgroundColor: 'rgb(99, 206, 194)',
                  pointHoverBorderColor: 'rgb(247, 248, 249)',
                  pointHoverBorderWidth: 4,
                  pointRadius: 0,
                  pointHitRadius: 30,
                  data: []
               }
            ]
         }
      };

      // Options for the chart
      this.options = { 
         maintainAspectRatio: false,
         legend: {
            display: false
         },
			showAllTooltips: true,
			tooltips: {
				custom: function(tooltip) {
					if (!tooltip) return;
					// disable displaying the color box;
					tooltip.displayColors = false;
				},
				callbacks: {
					label: function(tooltipItem) {
						return tooltipItem.yLabel;
					}
				}
			},
         scales: {
            yAxes: [{
               ticks: {
                  fontColor: "rgb(247, 248, 249)",
                  fontSize: 12,
               },
               gridLines: {
                  display: false
               }
            }],
            xAxes: [{
               ticks: {
                  fontColor: "rgb(247, 248, 249)",
                  fontSize: 12,
                  stepSize: 1,
               },
               gridLines: {
                  display: false
               }
            }]
         }
      }

      this.getDay();
   }


   // Get the data for day up to date day chart
   getDay = () => {
      // Hard coded symbol for now
      axios.get("http://localhost:5000/api/stock/AMD/history/day")
         .then((res) => {
            // Sort the array depend on epoch
            var sortedArr = sortJsonArray(res['data'], 'epochTime', 'asc');
            var prices = [];
            var labels = [];
            // Getting an array of prices and times
            sortedArr.forEach(function(data) {
               prices.push(data['price']);
               labels.push(data['time'].substring(11, 16));
            });
            // Update the state with new information
            var newData = this.state;
            newData['data']['datasets'][0]['data'] = prices;
            newData['data']['labels'] = labels;
            // Make the points smaller
            newData['data']['datasets'][0]['pointHoverRadius'] = 5;
            newData['data']['datasets'][0]['pointHitRadius'] = 7;
            this.setState(newData);
            console.log(labels);
            console.log(this.state);
         })
         .catch((err) => {
            console.log(err);
         });
   }

   render() {
      return (
         <div className="Stock">
            <h1>AMD</h1>
            <div className="stock-chart">
               <Line data={this.state.data} options={this.options}/>
            </div>
            <div className="stock-shares-owned">
               23 shares owned
            </div>
            <div className="stock-chart-time-select">
               <button>1D</button><button>1W</button><button>1M</button>
               <button>1Y</button><button>ALL</button>
            </div>
            <div className="stock-buy-sell-btns">
               <button id="stock-buy-btn" className="stock-btn">BUY</button>
               <button id="stock-sell-btn" className="stock-btn">SELL</button>
            </div>
         </div>
      );
   }
}

export default Stock;
