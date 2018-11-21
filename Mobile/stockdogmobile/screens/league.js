import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style/screens/league';
import NavBar from '../components/navbar';
import RatingsList from '../components/ratingsList';

export default class League extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   render() {

      return (
         <View style={styles.background}>
            <NavBar />
            <View style={styles.horizontal}>
               <View style={styles.leagueHeader}>
                  <Text style={styles.leagueTitle}>Week League</Text>
               </View>
            </View>
            <RatingsList />
         </View>
      );
   }
}