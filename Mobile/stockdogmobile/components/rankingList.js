import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../style/screens/league';

export default class RankingList extends Component {
   constructor(props) {
      super(props);
   }

   keyExtractor = (item, index) => index

   renderRankingRow = (item) => {
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
               data={this.props.members}
               renderItem={this.renderRankingRow}/>
         </View>
      );
   }
}