import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import containers from '../style/containers';
import text from '../style/text';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';
import PortfolioStockList from '../components/portfolioStockList';

export default class Portfolio extends Component {
   constructor(props) {
      super(props);
      this.state = {
         scrollEnabled: true
      }
   }

   render() {
      return (
         <View style={containers.profileBackground}>
            <ScrollView scrollEnabled={this.state.scrollEnabled}>
               <View style={containers.profileBackgroundCircle}></View>
               <NavBar/>
               <View style={{flex: 0.9, alignItems: 'center'}}>
                  <View style={containers.portfolioValue}>
                     <Text style={text.value}>$20.05</Text>
                  </View>
                  <TouchableWithoutFeedback
                     onPressIn={() => {this.setState({scrollEnabled: false})}}
                     onPressOut={() => {this.setState({scrollEnabled: true})}}>
                     <View>
                        <StockChart />
                     </View>
                  </TouchableWithoutFeedback>
                  <ButtonGroup
                     // onPress={this.updateIndex.bind(this)}
                     selectedIndex={0}
                     buttons={['D', 'M', 'Y']}
                     containerStyle={containers.dateRangeButtonGroup}
                     textStyle={text.whiteText}
                     buttonStyle={containers.transparentBackground}
                     selectedButtonStyle={containers.buttonGroupSelected}
                     selectedTextStyle={text.whiteText}
                  />
                  <PortfolioStockList listType='portfolio'/>
                  <PortfolioStockList listType='watchlist'/>
               </View>
            </ScrollView>
         </View>
      );
   }
}