import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../style/screens/league';

export default class RatingsList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         members: [
            {'name': 'Billy Joe', 'worth': 30312.32},
            {'name': 'Bob Belcher', 'worth': 26324.97},
            {'name': 'Seagull Shaul', 'worth': 20683.69},
            {'name': 'Chillyboi', 'worth': 18232.65},
            {'name': 'Weeboo', 'worth': 10231.53},
            {'name': 'Poor person', 'worth': 459.23}
         ]
      };
   }

   keyExtractor = (item, index) => index

   renderItem = (item) => {
      return (
         <View style={styles.horizontalItem}>
            <Text style={styles.listText}>{item.index + 1}  {item.item.name}</Text>
            <Text style={styles.listText}>${item.item.worth}</Text>
         </View>
      );
   }

   render() {

      return (
         <View style={styles.ratingsList}>
            <View style={styles.smallHeaderView}>
               <Text style={styles.smallHeader}> Player </Text> 
               <Text style={styles.smallHeader}> Worth</Text>
            </View>
            <FlatList
               keyExtractor={this.keyExtractor}
               data={this.state.members}
               renderItem={this.renderItem}/>
         </View>
      );
   }
}