import { StyleSheet } from 'react-native';
import { colors } from '../colors';

export default styles = StyleSheet.create({
   // ----------------- Containers ------------- //
   background: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center',
      justifyContent: 'flex-start',
   },
   headerRow: {
      flex: 0.1,
      flexDirection: 'row',
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center'
   },
   chosenHeader: {
      borderBottomWidth: 3,
      borderColor: colors.bright,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10
   },
   notChosenHeader: {
      borderBottomWidth: 1,
      borderColor: colors.grey,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 10
   },
   // ----------------- Text ------------- //
   headerText: {
      fontSize: 36,
      fontFamily: 'assistant',
      // fontFamily: 'assistant-semibold',
      color: colors.white
   }
});