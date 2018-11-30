import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../style/screens/feed';

export default class IdeaFeed extends Component {

   render() {
      return (
         <View style={styles.headerRow}>
            <Text style={styles.headerText}>Hi this is the idea</Text>
         </View>
      );
   };
};