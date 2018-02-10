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
      // backgroundColor: 'red'
    },
    chartOut: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    iconHeaders: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
    },
    underChart: {
      flex: 0.2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // backgroundColor: 'red',
      marginTop: -50
      // alignItems: 'center'
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
      justifyContent: 'center',
      alignItems: 'center'
    },
    outerModal: {
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    }
});