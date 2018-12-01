import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../style/screens/feed';
import ActivityPost from '../components/activityPost';

export default class ActivityFeed extends Component {

   constructor(props) {
      super(props);
      this.state = {
         activities: [
            {
               'userId': 1,
               'username': 'Billy Joe',
               'amount': 12,
               'ticker': 'AMD',
               'action': 'Buy',
               'date': 'Today',
               'comments': [
                  {
                     'userId': 2,
                     'username': 'Millie Bobbie',
                     'comment': 'I think this is a really smart buy since AMD has earnings coming up.',
                     'date': 'Today'
                  },
                  {
                     'userId': 3,
                     'username': 'Hater Boo Boo',
                     'comment': 'What a dumb buy lol!',
                     'date': 'Today'
                  }
               ]
            },
            {
               'userId': 4,
               'username': 'Gill Tilly',
               'amount': 7,
               'ticker': 'FB',
               'action': 'Sell',
               'date': 'Yesterday',
               'comments': [
                  {
                     'userId': 3,
                     'username': 'Hater Boo Boo',
                     'comment': 'Dude it\'s only going up',
                     'date': 'Today'
                  }
               ]
            }
         ]
      }
   }

   keyExtractor = (item, index) => index

   renderActivityPost = (activity) => {
      return (
         <ActivityPost post={activity.item}/>
      );
   }

   render() {
      return (
         <View style={{flex: 1}}>
            <View style={styles.feedPostsContainer}>
               <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.activities}
                  renderItem={this.renderActivityPost}
                  showsHorizontalScrollIndicator={false}/>
            </View>
         </View>
      );
   };
};