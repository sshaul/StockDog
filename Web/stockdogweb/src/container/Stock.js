import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import API from '../api';

class Stock extends Component {
   constructor(props) {
      super(props);

      this.api = new API();

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
                  pointHoverRadius: 20,
                  pointHoverBackgroundColor: 'rgb(99, 206, 194)',
                  pointHoverBorderColor: 'rgb(247, 248, 249)',
                  pointHoverBorderWidth: 4,
                  pointRadius: 0,
                  pointHitRadius: 30,
                  data: []
               }
            ]
         },
         ticker: this.props.match.params.ticker.toUpperCase()
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
                  callback: function(label, index, labels) {
                     return Math.round(label * 100) / 100;
                  }
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
                  //maxTicksLimit: 5
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
      const ticker = this.state.ticker;

      this.api.stockHistory(ticker, 'day', (history) => {
         // Sort the array depend on epoch
         var prices = [];
         var labels = [];
         // Getting an array of prices and times
         history.forEach(function(data) {
            prices.push(data['price']);
            labels.push(data['time'].substring(11, 16));
         });
         // Update the state with new information
         var newData = this.state;
         newData['data']['datasets'][0]['data'] = prices;
         newData['data']['labels'] = labels;
         // Make the points smaller
         newData['data']['datasets'][0]['pointHoverRadius'] = 5;
         newData['data']['datasets'][0]['pointHitRadius'] = 10;
         this.setState(newData);
         console.log(this.state)
      });            
   }

   render() {
      return (
         <div className="Stock">
            <h1>{this.state.ticker}</h1>
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
