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
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    chartOut: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-start',
      //backgroundColor: 'red'
    },
    chartIn: {
      flex: 1,
      backgroundColor: colors.dark,
      borderBottomWidth: 2,
      borderBottomColor: colors.white,
      borderLeftWidth: 2,
      borderLeftColor: colors.white
      
    },
    iconHeaders: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: colors.grey,
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
    },
    buttons: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
});