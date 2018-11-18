import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default login = StyleSheet.create({
   // ----------------- Containers ------------- //
   gradientBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
      width: '100%'
   },
   logo: {
      width: 305,
      height: 193
   },
   // ----------------- Text ------------- //
   title: {
      color: colors.bright,
      fontFamily: 'assistant',
      fontSize: 40,
      backgroundColor: 'transparent'
   },
   smallText: {
      fontSize: 16,
      fontFamily: 'assistant',
      color: colors.bright,
      textDecorationLine: 'underline'
   }
});