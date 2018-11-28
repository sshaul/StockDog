import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../style/screens/league';
import NavBar from '../components/navbar';
import RankingList from '../components/rankingList';

export default class League extends Component {
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

   render() {

      return (
         <View style={styles.background}>
            <NavBar />
            <View style={styles.horizontal}>
               <View style={styles.leagueHeader}>
                  <Text style={styles.leagueTitle}>Week League</Text>
               </View>
            </View>
            <RankingList members={this.state.members} />
         </View>
      );
   }
}