import React, { Component } from 'react';
import { View } from 'react-native';
import NavBar from '../components/navbar';
import FeedHeader from '../components/feedHeader';
import styles from '../style/screens/feed';
import ActivityFeed from './activityFeed';
import IdeaFeed from './ideaFeed';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedType: 'activity'
    };
  }

  switchFeedType = (newFeedType) => {
    this.setState({feedType: newFeedType});
  }
  
  render() {
    return (
      <View style={styles.background}>
        <NavBar/>
        <FeedHeader 
          feedType={this.state.feedType} 
          switchFeedType={this.switchFeedType}/>
        {this.state.feedType === 'activity' ? 
          <ActivityFeed/> : 
          <IdeaFeed/>}
      </View>
    );
  }
}