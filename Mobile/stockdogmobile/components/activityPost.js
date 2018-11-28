import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../style/screens/feed';

export default class ActivityPost extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      var post = this.props.post;
      return (
         <View>
            <Text style={styles.miniText}>{post.date}</Text>
            <View style={styles.postTitleContainer}>
               <Text style={styles.postTitle}>{post.username}</Text>
               <Text style={styles.postTitle}>{post.amount} {post.ticker} {post.action}</Text>
            </View>
            <View style={styles.commentContentContainer}>
               <Text style={styles.commentTitle}>{post.comments[0].username}</Text>
               <Text style={styles.commentContent}>{post.comments[0].comment}</Text>
            </View>
         </View>
      );
   };
};