import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import containers from '../style/containers';
import text from '../style/text';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';

export default class Portfolio extends Component {

   render() {
      return (
         <View style={containers.profileBackground}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}  >
               <View style={containers.profileBackgroundCircle}></View>
               <NavBar/>
               <View style={{flex: 0.9, alignItems: 'center'}}>
                  <View style={containers.portfolioValue}>
                     <Text style={text.value}>$20.05</Text>
                  </View>
                  <StockChart />
                  <PortfolioStockList listType='portfolio'/>
                  <PortfolioStockList listType='watchlist'/>
               </View>
            </ScrollView>
         </View>
      );
   }
}