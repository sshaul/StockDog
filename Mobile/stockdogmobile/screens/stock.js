import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ButtonGroup } from 'react-native-elements';
import styles from '../style/screens/stock';
import StockChart from '../components/stockchart';
import NavBar from '../components/navbar';

export default class Stock extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };

   };

   componentDidMount() {

   }

   openModal() {
      Actions.tradingmodal({ 
         buyingPower: 10,
         total: 0,
         price: 2
      });
   }

   updateIndex(selectedIndex) {

   }

   render() {
      return (
         <View style={styles.background}>
            <NavBar/>
            <View style={styles.stockContent}>
               <View style={styles.tickerContainer}>
                  <Text style={styles.tickerText}>GRPN</Text>
               </View>
               <StockChart/>
               <ButtonGroup
                  // onPress={this.updateIndex.bind(this)}
                  selectedIndex={0}
                  buttons={['D', 'M', 'Y']}
                  containerStyle={styles.dateRangeButtonGroup}
                  textStyle={text.whiteText}
                  buttonStyle={styles.transparentBackground}
                  selectedButtonStyle={styles.buttonGroupSelected}
                  selectedTextStyle={styles.whiteText}
               />
            </View>
            <View style={styles.tradingBox}>
               <View style={styles.stockInfo}>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>13</Text>
                     <Text style={styles.label}>Owned</Text>
                  </View>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>$20.15</Text>
                     <Text style={styles.label}>Price</Text>
                  </View>
                  <View style={styles.stockInfoNumber}>
                     <Text style={styles.number}>20M</Text>
                     <Text style={styles.label}>Volume</Text>
                  </View>
               </View>
               <View style={styles.tradingButtonContainer}>
                  <TouchableOpacity style={styles.tradingButton} onPress={this.openModal}>
                     <Text style={styles.tradingButtonText}>Trade</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}