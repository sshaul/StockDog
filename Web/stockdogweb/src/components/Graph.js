import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import API from '../api';
import TimeFrame from '../components/TimeFrames'
import loading from "../img/loading.svg";

class Graph extends Component {
   constructor(props) {
      super(props);

      this.api = new API();

      this.loadingAnimation =
         <div className="loading-animation-wrapper">
            <div className="loading-animation">
               <img src={loading} alt="Loading"/>
            </div>
         </div>

      this.state = {
         initialLoad: true, // Used to prevent extra setState for loading animation
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
         sellOpen: false,
         portfolioId: this.props.portfolioId ||
            this.props.match.params.portfolioId,
         loadingAnimation: this.loadingAnimation
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
      // Really need to refactor this cause its setStating too many times
      if (this.state.initialLoad === false) {
         this.setState({
            loadingAnimation: this.loadingAnimation
         });
      }

      console.log("Getting data for " + timeFrame);

      const ticker = this.props.ticker;

      console.log(ticker);

      if (ticker !== "PORTFOLIO") {
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
            // Update parent's current price
            this.props.updateCurrentPrice(
               Math.round(prices[prices.length-1]*100)/100);
            // Make the points smaller
            newData['data']['datasets'][0]['pointHoverRadius'] = 5;
            newData['data']['datasets'][0]['pointHitRadius'] = 10;
            // Turn off loading animation.
            newData["loadingAnimation"] = <div></div>
            newData["initialLoad"] = false;
            this.setState(newData);
         });
      }

   }

   render() {
      return (
         <div className="Graph">
            {this.state.loadingAnimation}
            <div className="stock-chart">
               <Line data={this.state.data} options={this.options}/>
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
