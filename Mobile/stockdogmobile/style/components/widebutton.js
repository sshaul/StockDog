import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export default styles = StyleSheet.create({
   // ----------------- Containers ------------- //
   loginButton: {
      height: 45,
      width: 250,
      borderColor: colors.bright,
      borderWidth: 1,
      borderRadius: 25,
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
   disabledLoginButton: {
      height: 45,
      width: 250,
      borderColor: colors.grey,
      borderWidth: 1,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
   },
   // ----------------- Text ------------- //
   wideButton: {
      fontSize: 20,
      fontFamily: 'assistant',
      color: colors.white
   },
});