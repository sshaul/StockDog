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
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   chosenHeader: {
      flex: 0.5,
      borderBottomWidth: 3,
      borderColor: colors.bright,
      alignItems: 'center',
      paddingBottom: 10
   },
   notChosenHeader: {
      flex: 0.5,
      borderBottomWidth: 3,
      borderColor: colors.grey,
      alignItems: 'center',
      paddingBottom: 10,
   },
   feedPostsContainer: {
      flex: 0.9,
      width: '80%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
   },
   postTitleContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between'
   },
   commentContentContainer: {
      marginLeft: 20,
      paddingTop: 10,
      flexWrap: 'wrap'
   },
   // ----------------- Text ------------- //
   headerText: {
      fontSize: 36,
      fontFamily: 'assistant-semibold',
      color: colors.white
   },
   postTitle: {
      fontSize: 24,
      fontFamily: 'assistant-semibold',
      color: colors.bright
   },
   miniText: {
      fontSize: 10,
      fontFamily: 'assistant-semibold',
      color: colors.lightGrey
   },
   commentTitle: {
      fontSize: 16,
      fontFamily: 'assistant-semibold',
      color: colors.white
   },
   commentContent: {
      fontSize: 16,
      fontFamily: 'assistant-extralight',
      color: colors.white
   },
   replyButtonText: {
      fontSize: 16,
      fontFamily: 'assistant-semibold',
      color: colors.bright,
      textDecorationLine: 'underline'
   },
});