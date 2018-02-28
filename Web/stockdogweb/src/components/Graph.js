import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import API from '../api';
import TimeFrame from '../components/TimeFrames'

class Graph extends Component {
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
         ticker: this.props.ticker,
         currentPrice: 0,
         buyOpen: false,
         sellOpen: false
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
						return '$' + tooltipItem.yLabel;
					}
            },
            mode: 'x-axis'
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
                  maxTicksLimit: 5
               },
               gridLines: {
                  display: false
               }
            }]
         }
      }

      this.getData('day');
   }


   // Get the data for the timeFrame given
   getData = (timeFrame) => {
      console.log("Getting data for " + timeFrame);

      const ticker = this.props.ticker;

      this.api.stockHistory(ticker, timeFrame, (history) => {
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
         // Setting the current price and round to the 2nd decimal 
         newData['currentPrice'] = Math.round(prices[prices.length-1]*100)/100;
         // Make the points smaller
         newData['data']['datasets'][0]['pointHoverRadius'] = 5;
         newData['data']['datasets'][0]['pointHitRadius'] = 10;
         this.setState(newData);
      });            
   }

   handleStockSearch = (event) => {
      this.setState({searchStock: event.target.value});
   }

   // Redirect to a different stock page
   changeStock = (stock) => {
      this.props.history.push('/stock/' + this.state.searchStock); 
   }

   render() {
      return (
         <div className="Graph">
            <div className="stock-titles">
               <h1>{this.props.title}</h1>
               <h2>${this.state.currentPrice}</h2>
            </div>
            <div className="stock-search">
               <form onSubmit={this.changeStock}>
                  <input id="stock-search-input" value={this.state.value}
                     placeholder="search stock" 
                     onChange={this.handleStockSearch}/>
               </form>
            </div>
            <div className="stock-chart">
               <Line data={this.state.data} options={this.options}/>
            </div>
            <div className="stock-shares-owned">
               23 shares owned
            </div>
            <div className="stock-chart-time-select">
               <TimeFrame timeFrame='day' text='1D' getData={this.getData} />
               <TimeFrame timeFrame='week' text='1W' getData={this.getData}/>
               <TimeFrame timeFrame='month' text='1M' getData={this.getData}/>
               <TimeFrame timeFrame='year' text='1Y' getData={this.getData}/>
               <button>ALL</button>
            </div>
         </div>
      );
   }
}

export default withRouter(Graph);
