import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../style/colors';
import styles from '../style/screens/loginRegister';
import { LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/Feather';
import PopoverTooltip from 'react-native-popover-tooltip';
import WideButton from '../components/widebutton';
import FormInput from '../components/formInput';
import { registerUser } from '../actions/authActions';
import { register } from '../api';

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
         firstname: "",
         lastname: "",
         email: "",
         password: ""
      };

      this.inputs = {};
   }

   focusNextField(id) {
      this.inputs[id].focus();
   }

   navToLogin = () => {
      const navigation = this.props.navigation;
      navigation.goBack(null);
   }

   submitRegister = () => {
      if (!this.state.email.includes('@')) {
         alert('Please enter a valid email address.');
      }
      else {
         register(this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.password
         ).then(() =>{
            this.props.registerUser(this.state.email);
            Actions.login({email: this.state.email});
         }).catch((e) => {
            console.log(e.response.data[0]);
            alert('Invalid registration. ' +
               'Please enter all fields and ' + 
               'follow password instructions.');
         });
      }
   }

   validatePassword(password) {
      return password.length >= 8 && password.match('.*[0-9].*');
   }

   render() {
      var disabled = !(this.state.firstname && this.state.lastname
         && this.state.email && this.validatePassword(this.state.password));
      return (
         <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.background}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}>
            <LinearGradient
               colors={['transparent', colors.lightBackground]}
               style={styles.gradientBackground}>
               <Text style={styles.title}>StockDog</Text>
               <FormInput
                  type="first name"
                  onchange={(firstname) => this.setState({ firstname })}
                  value={this.state.firstname}
                  returnKeyType={"next"}
                  onSubmitEditing={() => { this.focusNextField('last name'); }} />
               <FormInput
                  type="last name"
                  onchange={(lastname) => this.setState({ lastname })}
                  value={this.state.lastname}
                  returnKeyType={"next"}
                  refer={input => { this.inputs['last name'] = input; }}
                  onSubmitEditing={() => { this.focusNextField('email'); }} />
               <FormInput
                  type="email"
                  onchange={(email) => this.setState({ email })}
                  value={this.state.email}
                  returnKeyType={"next"}
                  refer={input => { this.inputs['email'] = input; }}
                  onSubmitEditing={() => { this.focusNextField('password'); }} />
               <View style={styles.horizontal}>
                  <FormInput
                     type="password"
                     onchange={(password) => this.setState({ password })}
                     value={this.state.password}
                     returnKeyType={"done"}
                     refer={input => { this.inputs['password'] = input; }}
                     onSubmitEditing={() => {
                        if (disabled) {
                           alert('Invalid registration. ' +
                              'Please enter all fields and ' + 
                              'follow password instructions.');
                        }
                        else {
                           this.submitRegister();
                        }
                     }} />
                  <PopoverTooltip
                     ref='tooltip1'
                     buttonComponent={
                        <View style={styles.popoverButton}>
                           <Icon name='info' size={30} color='white' />
                        </View>
                     }
                     items={[{
                        label: 'Password must be at least 8 characters long ' +
                           'and contain at least 1 number.',
                        onPress: () => { }
                     }]} />
               </View>
               <WideButton 
                  type='register' 
                  disabled={disabled} 
                  onpress={this.submitRegister} />
               <TouchableOpacity
                  style={styles.smallTextButton}>
                  <Text
                     style={styles.smallText}
                     onPress={this.navToLogin}>
                     Return to log in
                  </Text>
               </TouchableOpacity>
            </LinearGradient>
         </KeyboardAwareScrollView>
      );
   }
}

export default connect(null, { registerUser })(Register);