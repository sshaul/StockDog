import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import containers from '../style/containers';
import text from '../style/text';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';

export default class Portfolio extends Component {

   render() {
      return (
         <ScrollView contentContainerStyle={containers.profileBackground}>
            <View style={containers.profileBackgroundCircle}>
            </View>
            <View style={containers.screenContent}>
               <NavBar/>
               <View style={containers.portfolioValue}>
                  <Text style={text.value}>$20.05</Text>
               </View>
               <StockChart />
               <PortfolioStockList listType='portfolio'/>
               {/* <PortfolioStockList listType='watchlist'/> */}
               {/* <PortfolioStockList listType='watchlist'/> */}
            </View>
         </ScrollView>
      );
   }
}