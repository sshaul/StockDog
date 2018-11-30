import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/feed';

export default class FeedHeader extends Component {

   getHeaderStatusStyle = (feedType) => {
      return this.props.feedType === feedType ? 
         styles.chosenHeader : 
         styles.notChosenHeader;
   }

   render() {
      return (
         <View style={styles.headerRow}>
            <TouchableOpacity 
               style={this.getHeaderStatusStyle('activity')}
               onPress={() => this.props.switchFeedType('activity')}>
               <Text style={styles.headerText}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity 
               style={this.getHeaderStatusStyle('ideas')}
               onPress={() => this.props.switchFeedType('ideas')}>
               <Text style={styles.headerText}>Ideas</Text>
            </TouchableOpacity>
         </View>
      );
   };
};