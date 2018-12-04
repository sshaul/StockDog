import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors.js';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
   // ----------------- Containers ------------- //
   outermostBaseContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
   },
   baseModal: {
      flex: 0.6,
      right: 0,
      left: 0
   },
   modalHeaders: {
      flex: 0.1,
      alignItems: 'flex-end',
      justifyContent: 'center'
   },
   innerModal: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   outerModal: {
      width: width * .8,
      height: height * .6,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.modalBackground,
      shadowColor: colors.black,
      shadowOpacity: 75,
      shadowOffset: {
         height: 7
      }
   },
   swipeline: {
      width: 50,
      height: 6,
      backgroundColor: colors.swipeline,
      borderRadius: 25
   },
   tradingButtonGroup: {
      height: height * 0.05,
      width: '60%',
      borderWidth: 1,
      borderColor: colors.bright,
      borderRadius: 8,
      backgroundColor: 'transparent'
   },
   buttonGroupSelected: {
      backgroundColor: colors.bright
   },
   inputs: {
      flex: 0.5,
      justifyContent: 'space-around',
      alignItems: 'center'
   },
   amountInput: {
      width: width * 0.3,
      height: 48,
      backgroundColor: colors.white,
      borderColor: colors.grey,
      borderRadius: 8,
      paddingLeft: 20
   },
   total: {
      flex: 0.2,
      justifyContent: 'center'
   },
   executeButton: {
      width: '60%',
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bright,
      borderRadius: 8,
      marginTop: 10
   },
   disabledExecuteButton: {
      width: '60%',
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: colors.bright,
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 10
   },
   // ----------------- Text ------------- //
   buyingPowerText: {
      textAlign: 'center',
      fontFamily: 'assistant',
      fontSize: 20,
      color: colors.black
   },
   totalText: {
      fontFamily: 'assistant',
      fontSize: 36,
      color: colors.black
   },
   executeButtonText: {
      fontFamily: 'assistant',
      fontSize: 20,
      color: colors.white
   },
   disabledExecuteButtonText: {
      fontFamily: 'assistant',
      fontSize: 20,
      color: colors.black
   },
});