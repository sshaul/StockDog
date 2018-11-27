import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../style/screens/feed';

export default class ActivityFeed extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <View style={styles.headerRow}>
            <Text style={styles.headerText}>Hi this is the activity</Text>
         </View>
      );
   };
};