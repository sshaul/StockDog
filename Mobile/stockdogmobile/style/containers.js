import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    profileGeneral: {
      flex: 1,
      backgroundColor: colors.dark,
      justifyContent: 'flex-start',
      paddingTop: 0
    },
    chart: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: -10
    },
    chartOut: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-start'
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
    modalHeaders: {
      flex: 0.3,
      width: '70%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    innerModal: {
      flex: 0.9,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    outerModal: {
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    },
    profileChart: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    portfolioItem: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderStyle: 'solid', 
      borderColor: colors.white, 
      borderWidth: 2
    },
    groupsDrawer: {
      flex: 1,
      backgroundColor: colors.grey,
      alignItems: 'center',
      paddingTop: 30
    },
    groupsList: {
      flex: 1,
      paddingTop: 20,
      width: '80%'
    },
    groupItem: {
      borderStyle: 'solid', 
      borderColor: colors.dark, 
      borderWidth: 2
    }
});