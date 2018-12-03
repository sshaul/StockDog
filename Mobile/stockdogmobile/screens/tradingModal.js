import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Lightbox from '../components/baseLightbox';
import { Actions } from 'react-native-router-flux';
import { colors } from '../style/colors';
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

      // These will be props passed to the modal
      var buyingPower = 10;
      var total = 0;
      var price = 0;

      return (
         <Lightbox verticalPercent={0.5} horizontalPercent={0.8}>
            <View style={styles.buyingPower}>
               <Text style={styles.buyingPowerText}>
                  Buying Power: ${buyingPower}
               </Text>
            </View>
            <View style={styles.inputs}>
               <Text style={styles.buyingPowerText}>
                  Current Price: {price}
               </Text>
               <ButtonGroup
                  // onPress={this.updateIndex.bind(this)}
                  selectedIndex={0}
                  buttons={['Buy', 'Sell']}
                  containerStyle={styles.tradingButtonGroup}
                  textStyle={styles.buttonText}
                  buttonStyle={styles.transparentBackground}
                  selectedButtonStyle={styles.buttonGroupSelected}
                  selectedTextStyle={{color: 'white'}}
               />
               <TextInput
                  style={styles.amountInput}
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
         </Lightbox>
      );
   }
};
