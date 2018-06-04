import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio } from 'react-native';
import { colors } from './colors.js'; 

export default containers = StyleSheet.create({
    general: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30
    },
    tabBar: {
      borderTopColor: '#657a86',
      borderTopWidth: 1 / PixelRatio.get()
    },
    profileGeneral: {
      flex: 1,
      backgroundColor: colors.dark,
      justifyContent: 'flex-start',
      paddingTop: 0
    },
    iconHeaders: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
    },
    // ----------------- Stock chart ------------- //
    chart: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    chartOut: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    underChart: {
      flex: 0.2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginTop: -50
    },
    buttons: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    // ----------------- Buy/Sell modals ------------- //
    modalHeaders: {
      flex: 0.2,
      width: '80%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    innerModal: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      // backgroundColor: 'yellow'
    },
    outerModal: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    },
    successMessage: {
      width: 270, 
      height: '100%', 
      alignItems: 'center', 
      justifyContent: 'center',
      // backgroundColor: 'blue'
    },
    check: {
      paddingTop: 20,
    },
    // ----------------- Portfolio page ------------- //
    portfolioItem: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderStyle: 'solid', 
      borderColor: colors.white, 
      borderWidth: 2
    },
    // ----------------- League Drawer ------------- //
    groupsDrawer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 30
    },
    leaguesList: {
      flex: 1,
      paddingTop: 20,
      width: '100%',
      borderBottomWidth: 1
    },
    leaguesFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
      marginTop: 10,
    },
    groupItem: {
      borderStyle: 'solid', 
      borderColor: colors.grey, 
      borderWidth: 2
    },
    // ----------------- Add group/join group modals ------------- //
    addGroupModalHeader: {
      flex: 0.2,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addGroupInnerModal: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 10
    },
    addGroupOuterModal: {
      flex: 1,
      width: '80%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    },
    // ----------------- League Page ------------- //
    leagueName: {
      flex: 0.2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: -50
    },
    leagueMembers: {
      flex: 0.6,
      flexDirection: 'column',
      paddingLeft: 20,
      paddingRight: 20
    },
    memberRow: {
      flex: 2,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "gray",
    },
    membersRank: {
      flex: 0.3,
      alignItems: 'center'
    },
    membersName: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 0.4
    },
    membersValue: {
      flex: 0.3,
      alignItems: 'flex-end',
      paddingRight: 10
    },
    code: {
      flex: 0.5,
      padding:10
    },
    // ----------------- Settings Modal ------------- //
    settingsHeader: {
      flex: 0.3,
      justifyContent: 'flex-end',
    },
    settingsIconHeaders: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
    },
    // ----------------- Feed ------------- //
    activity: {
      flex: 0.2,
    },
    feedTitle: {
      flex: 0.2,
      alignItems: 'center',
    },
    feed: {
      flex: 0.7,
      marginTop: -40
    }
});