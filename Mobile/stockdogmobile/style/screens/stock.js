import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors.js';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
   background: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   stockContent: {
      flex: 0.6,
      justifyContent: 'space-around'
   },
   tickerContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
   },
   dateRangeButtonGroup: {
      height: height * 0.05,
      width: '80%',
      borderWidth: 1,
      borderColor: colors.bright,
      borderRadius: 8,
      backgroundColor: 'transparent'
   },
   buttonGroupSelected: {
      backgroundColor: colors.bright
   },
   transparentBackground: {
      backgroundColor: 'transparent'
   },
   tradingBox: {
      backgroundColor: colors.white,
      flex: 0.3,
      width: '100%',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 10
   },
   stockInfo: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'center'
   },
   stockInfoNumber: {
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   tradingButtonContainer: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   tradingButton: {
      width: '60%',
      height: '40%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bright,
      borderRadius: 8
   },
   // ----------------- Text ------------- //
   tickerText: {
      fontFamily: 'assistant',
      fontSize: 36,
      color: colors.bright
   },
   whiteText: {
      fontFamily: 'assistant',
      color: colors.white
   },
   number: {
      fontFamily: 'assistant-bold',
      fontSize: 26,
      color: colors.black
   },
   label: {
      fontFamily: 'assistant',
      fontSize: 18,
      color: colors.black
   },
   tradingButtonText: {
      fontFamily: 'assistant',
      fontSize: 20,
      color: colors.white
   },
});