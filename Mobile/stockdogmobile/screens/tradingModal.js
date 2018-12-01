import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput, Picker } from 'react-native';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import {colors} from '../style/colors';
import styles from '../style/screens/tradingmodal';

export default class TradingModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         price: '',
         amount: ''
      };
   }

   buysellstock() {
      // var props = this.props.navigation.state.params;
      // if (/[a-zA-Z]/.test(this.state.amount)) {
      //    alert("Invalid amount value. Please enter numbers only.");
      // }
      // else {
      //    this.api.manageStock(props.modalType, props.ticker, parseInt(this.state.amount),
      //       (res) => {
      //          if (res.status_code === 400) {
      //             alert(res.message);
      //          }
      //          else {
      //             this.setState({ transactionComplete: true });
      //          }
      //       });
      // }

   }

   onchangeamount(amount) {
      // this.setState({
      //    amount: amount.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{1,}/g, "")
      // });
   }

   render() {
      var buyingPower = 10;
      var total = 0;

      return (
         <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
            <View style={styles.outerModal}>
               <View style={styles.modalHeaders}>
                  <View style={styles.swipeline} />
               </View>
               <View style={styles.buyingPower}>
                  <Text style={styles.buyingPowerText}>
                     Buying Power: ${buyingPower}
                  </Text>
               </View>
               <View style={styles.inputs}>
                  <TextInput
                     style={styles.pickerSelect}
                     placeholder="Select an action."
                     placeholderColor={colors.black}
                     value={""}
                  />
                  <TextInput
                     style={styles.pickerSelect}
                     placeholder="Price"
                     placeholderColor={colors.black}
                     value={this.state.price}
                  />
                  <TextInput
                     style={styles.pickerSelect}
                     placeholder="Amount"
                     placeholderColor={colors.black}
                     value={this.state.amount}
                  />
               </View>
               <View style={styles.total}>
                  <Text style={styles.totalText}>
                     Total: ${total}
                  </Text>
               </View>
               <TouchableOpacity style={styles.executeButton}>
                  <Text style={styles.executeButtonText}>
                     Execute
                  </Text>
               </TouchableOpacity>
            </View>
         </Lightbox>
      );
   }
};
