import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import styles from '../style/screens/feed';
import IdeaPost from '../components/ideaPost';

export default class IdeaFeed extends Component {

   constructor(props) {
      super(props);
      this.state = {
         activities: [
            {
               'userId': 1,
               'username': 'Billy Joe',
               'idea': "AMD is doing really well let's all by thank you very much have great day.",
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
               'idea': "I love to buy and sell things every day this is so fun stockdog is the best!",
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
   
   renderIdeaPost = (idea) => {
      return (
         <IdeaPost post={idea.item}/>
      );
   }

   render() {
      return (
         <View style={{flex: 1}}>
            <View style={styles.feedPostsContainer}>
               <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.state.activities}
                  renderItem={this.renderIdeaPost}
                  showsHorizontalScrollIndicator={false}/>
            </View>
         </View>
      );
   };
};