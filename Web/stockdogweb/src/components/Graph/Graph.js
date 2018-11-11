import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import "./Graph.css";

import loading from "../../img/loading.svg";

const offWhite = 'rgb(247, 248, 249)';
const gray = '#929292';

class Graph extends Component {
   loadingAnimation = (
      <div className="Graph-loading-animation-wrapper">
         <div className="Graph-loading-animation">
            <img src={loading} alt="Loading" />
         </div>
      </div>
   )
   
   data = {
      labels: this.props.labels,
      datasets: [
         {
            fill: false,
            lineTension: 0,
            borderColor: offWhite,
            borderCapStyle: 'butt',
            borderJoinStyle: 'miter',
            borderWidth: 1,
            pointRadius: 3,
            pointBorderColor: offWhite,
            pointBackgroundColor: offWhite,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: offWhite,
            pointHoverBorderWidth: 0,
            pointHitRadius: 30,
            lineTension: .4,
            data: this.props.data
         }
      ]
   }

   // Options for the chart
   options = {
      responsive: true,
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
               fontColor: gray,
               fontSize: 12,
               callback: function(label, index, labels) {
                  return Math.round(label * 100) / 100;
               },
               fontFamily: "Assistant",
               fontStyle: "600"
            },
            gridLines: {
               display: false
            }
         }],
         xAxes: [{
            ticks: {
               fontColor: gray,
               fontSize: 12,
               stepSize: 1,
               maxTicksLimit: 5,
               fontFamily: "Assistant",
               fontStyle: "600"
            },
            gridLines: {
               display: false
            }
         }]
      }
   }
   
   render() { 
      return ( 
         <div class="Graph">
            {this.props.isLoading ? 
               this.loadingAnimation :
               <div class="Graph-graph">
                  <Line data={this.data} options={this.options} />
               </div>}
         </div>
       );
   }
}
 
export default Graph;
