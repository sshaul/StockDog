import { StyleSheet } from 'react-native';
import { colors } from './colors.js'; 

export default text = StyleSheet.create({
    // ------------- Login/Register ----------- // 
    title: {
      color: colors.white,
      fontFamily: 'open-sans-bold',
      fontSize: 48
    },
    loginButton: {
      fontSize: 20,
      fontFamily: 'open-sans',
      color: colors.white
    },
    smallText: {
      fontSize: 16,
      fontFamily: 'open-sans',
      color: colors.bright,
      textDecorationLine: 'underline'
    },
    // ---------------- Profile page ------------ //
    money: {
      color: colors.bright,
      fontFamily: 'open-sans',
      fontSize: 48,
      textAlign: 'center'
    },
    profileLabels: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 24,
      textAlign: 'left'
    },
    bigPortfolioText: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 20,
      textAlign: 'left'
    },
    smallPortfolioText: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 16,
      textAlign: 'left'
    },
    // ----------------- Modals ------------- // 
    joinLeagueTitle: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 24,
      textAlign: 'left'
    },
    joinLeagueWarning: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 14,
      paddingTop: 10
    },
    modalHeader: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 32
    },
    // ----------------- Stock page ------------- // 
    stock: {
      color: colors.bright,
      fontFamily: 'open-sans',
      fontSize: 36
    },
    stockMoney: {
      color: colors.bright,
      fontFamily: 'open-sans',
      fontSize: 42,
      textAlign: 'center'
    },
    // ----------------- Groups Drawer ------------- //
    groupTitle: {
      color: colors.dark,
      fontFamily: 'open-sans-bold',
      fontSize: 36,
      paddingLeft: 10
    },
    groupText: {
      color: colors.dark,
      fontFamily: 'open-sans',
      fontSize: 24,
      textAlign: 'left'
    },
    // ----------------- League Screen ------------- //
    leagueTitle: {
      color: colors.white,
      fontFamily: 'open-sans-bold',
      fontSize: 36,
    },
    inviteCode: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 20,
      textAlign: 'left',
    },
    members: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 24
    },
    addGroupText: {
      color: colors.dark,
      fontFamily: 'open-sans',
      fontSize: 20,
      textAlign: 'left'
    },
    // ----------------- Settings Modal ------------- //
    settingsTitle: {
      color: colors.white,
      fontFamily: 'open-sans',
      fontSize: 48, 
      textAlign: 'center',
    },
    // ----------------- Feed page ------------- //
    activityTitle: {
      color: colors.white
    },
    smallIconText: {
      fontSize: 16
    },
    medIconText: {
      fontSize: 14
    },
    largeIconText: {
      fontSize: 12
    }
});