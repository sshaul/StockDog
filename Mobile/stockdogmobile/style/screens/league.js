import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { colors } from '../colors.js';

export default styles = StyleSheet.create({
   background: {
      flex: 1,
      backgroundColor: colors.dark,
   },
   iconHeaders: {
      flex: 0.1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
   },
   horizontal: {
      marginTop: 10,
      flex: 0.1,
      flexDirection: 'row'
   },
   leagueHeader: {
      flex: 0.8,
      height: '100%',
      backgroundColor: colors.bright,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      justifyContent: 'center',
      paddingLeft: 40
   },
   ratingsList: {
      flex: 1,
   },
   horizontalItem: {
      padding: 40,
      paddingTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   smallHeaderView: {
      padding: 40,
      paddingTop: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   // ----------------- Text ------------- //
   leagueTitle: {
      fontFamily: 'assistant-semibold',
      fontSize: 36,
      color: colors.white
   },
   listText: {
      fontFamily: 'assistant-semibold',
      fontSize: 24,
      color: colors.white
   },
   smallHeader: {
      fontFamily: 'assistant-semibold',
      fontSize: 12,
      color: colors.white
   }
});