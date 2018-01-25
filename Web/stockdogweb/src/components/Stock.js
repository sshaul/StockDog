import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Stock extends Component {
   constructor() {
      super();

      this.state = {
         data: {}
      }

		this.data = {
			labels: ['12/22/17', '12/26/17', '12/27/17', '12/28/17', '12/29/17',
            '1/2/18', '1/3/18', '1/4/18', '1/5/18', '1/8/18', '1/9/18',
            '1/10/18', '1/11/18', '1/12/18', '1/16/18', '1/17/18', '1/18/18',
            '1/19/18', '1/22/18'],
			datasets: [
				{
					label: 'My First dataset',
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
					data: [
						10.54, 10.46, 10.53, 10.55, 10.28, 10.98, 
						11.55, 12.12, 11.88, 12.28, 11.82, 11.96, 12.14,
						12.02, 11.91, 12.18, 12.47, 12.59, 12.65
	            ]
				}
         ]
      };

      // Options for the chart
      this.options =  { 
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
      axios.get("localhost:5000/api/stock/AMD/history/day")
         .then((res) => {
            console.log(res);
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
               <Line data={this.data} options={this.options}/>
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
