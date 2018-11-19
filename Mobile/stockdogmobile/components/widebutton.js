import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../style/components/widebutton';

export default class WideButton extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      var buttonText = "";
      if (this.props.type == 'login')
         buttonText = 'LOGIN';
      else if (this.props.type == 'register')
         buttonText = 'REGISTER';
      else if (this.props.type == 'buy')
         buttonText = 'BUY';
      else if (this.props.type == 'sell')
         buttonText = 'SELL';
      else if (this.props.type == 'portfolio')
         buttonText = 'Next';
      else if (this.props.type == 'join')
         buttonText = 'Join league!';
      else if (this.props.type == 'cancel')
         buttonText = 'CANCEL';
      else if (this.props.type == 'logout')
         buttonText = 'LOGOUT';

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