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
      fontSize: 42,
    },
    // ----------------- Stock page ------------- // 
    stock: {
      color: colors.bright,
      fontFamily: 'open-sans',
      fontSize: 36
    }
});