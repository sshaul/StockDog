import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import text from '../style/text';
import {colors} from '../style/colors';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';

export default class Portfolio extends Component {

   render() {
      return (
         <View style={containers.profileBackground}>
            <ScrollView scrollEnabled={true}>
               <View style={containers.profileBackgroundCircle}></View>
               <NavBar/>
               <View style={{flex: 0.9, alignItems: 'center'}}>
                  <View style={containers.portfolioValue}>
                     <Text style={text.value}>$20.05</Text>
                  </View>
                  <StockChart />
                  <ButtonGroup
                     // onPress={this.updateIndex.bind(this)}
                     selectedIndex={0}
                     buttons={['D', 'M', 'Y']}
                     containerStyle={containers.dateRangeButtonGroup}
                     textStyle={{color: colors.white}}
                     buttonStyle={{backgroundColor: 'transparent'}}
                     innerBorderStyle={{width: 1.5, color: colors.bright}}
                     selectedButtonStyle={{backgroundColor: colors.bright}}
                     selectedTextStyle={{color: colors.white}}
                  />
                  <PortfolioStockList listType='portfolio'/>
                  <PortfolioStockList listType='watchlist'/>
               </View>
            </ScrollView>
         </View>
      );
   }
}