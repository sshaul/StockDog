import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import containers from '../style/containers';
import text from '../style/text';

export default class PortfolioStockList extends Component {

   constructor(props) {
      super(props);
      this.state = {
         stockList: [],
      }
   }

   componentDidMount = () => {
      if (this.props.listType === 'portfolio') {
         this.setState({'stockList': [{ticker: 'RAD', fullName: 'Rite Aid Corporation', value: 200.53, numShares: 20, difference: 27.21},
            {ticker: 'CAMT', fullName: 'Camtek LTD', value: 4021.21, numShares: 87, difference: -120.23},
            {ticker: 'WMT', fullName: 'Walmart Inc', value: 142.23, numShares: 12, difference: 21.82},
            {ticker: 'ZNGA', fullName: 'Zinga Inc', value: 6.23, numShares: 12, difference: -0.52}]});
      }
      else {
         this.setState({'stockList': [{ticker: 'RADW', fullName: 'Rite Aid Corporation', value: 200.53, difference: 27.21},
         {ticker: 'CAMTW', fullName: 'Camtek LTD', value: 4021.21, difference: -120.23},
         {ticker: 'WMTW', fullName: 'Walmart Inc', value: 142.23, difference: 21.82},
         {ticker: 'ZNGAW', fullName: 'Zinga Inc', value: 6.23, difference: -0.52}]})
      }
   }

   renderStockListingItem = (item, index) => {
      var difference = item.difference >= 0 ? 
         (<Text style={text.greenValue}>(+{item.difference})</Text>) :
         (<Text style={text.redValue}>({item.difference})</Text>)

      return (
         <View style={containers.listingItem} key={index}>
            <View style={containers.horizontalEdges}>
               <Text style={text.listingTickerAndValue}>{item.ticker}</Text>
               <View style={containers.horizontal}>
                  <Text style={text.listingTickerAndValue}>${item.value} </Text> 
                  {difference}
               </View>
            </View>
            <View style={containers.horizontalEdges}>
               <Text style={text.smallListingText}>{item.fullName}</Text>
               {item.numShares ? (<Text style={text.smallListingText}>{item.numShares} shares</Text>) : null}
            </View>
         </View>
      );
   }

   render() {
      return (
         <View style={containers.portfolioStockList}>
            <View style={containers.portfolioStockListHeader}>
               <Text style={text.portfolioStockListHeader}>
                  {this.props.listType === 'portfolio' ? 'Portfolio' : 'Watchlist'}
               </Text>
            </View>
            <View style={containers.portfolioListGroup}>
               {this.state.stockList.map((item, index) => {return this.renderStockListingItem(item, index);})}
            </View>
         </View>
      );
   }
};