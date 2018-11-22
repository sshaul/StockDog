import { StyleSheet } from 'react-native';
import { colors } from './colors.js';

export default elements = StyleSheet.create({
   roundedInput: {
      height: 45,
      width: 250,
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderColor: colors.placeholders,
      paddingLeft: 20,
      margin: 10
   },
   popoverButton: {
      width: 48,
      height: 48,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginLeft: -15
   },
   loginButton: {
      height: 45,
      width: 250,
      borderColor: colors.bright,
      borderWidth: 2,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   disabledLoginButton: {
      height: 45,
      width: 250,
      borderColor: colors.grey,
      borderWidth: 2,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   smallTextButton: {
      height: 25,
      backgroundColor: 'transparent',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
   },
   buyButton: {
      height: '60%',
      width: '45%',
      backgroundColor: colors.bright,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   sellButton: {
      height: '60%',
      width: '45%',
      backgroundColor: colors.red,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   sellModalButton: {
      height: 45,
      width: 250,
      backgroundColor: colors.red,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   tabNavIcon: {
      height: 24,
      width: 24
   }
});