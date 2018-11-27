import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../style/components/widebutton';

export default class WideButton extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      var buttonText = "";
      switch (this.props.type) {
         case 'login':
            buttonText = 'LOGIN';
            break;
         case 'register':
            buttonText = 'REGISTER';
            break;
         case 'buy':
            buttonText = 'BUY';
            break;
         case 'sell':
            buttonText = 'SELL';
            break;
         case 'portfolio':
            buttonText = 'Next';
            break;
         case 'join':
            buttonText = 'Join league!';
            break;
         case 'cancel':
            buttonText = 'CANCEL';
            break;
         case 'logout':
            buttonText = 'LOGOUT';
            break;
      }
      var style = styles.loginButton;
      if (this.props.type == 'sell') {
         style = styles.sellModalButton;
      }
      if (this.props.disabled) {
         style = styles.disabledLoginButton;
      };

      return (
         <TouchableOpacity
            style={style}
            onPress={this.props.onpress}
            disabled={this.props.disabled}
         >
            <Text style={styles.wideButton}>{buttonText}</Text>
         </TouchableOpacity>
      );
   }
};