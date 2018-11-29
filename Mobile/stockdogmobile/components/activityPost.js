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
         <View style={styles.activityPost}>
            <Text style={styles.miniText}>{post.date}</Text>
            <View style={styles.postTitleContainer}>
               <Text style={styles.postTitle}>{post.username}</Text>
               <Text style={styles.postTitle}>{post.amount} {post.ticker} {post.action}</Text>
            </View>
            {
               post.comments.map((comment, index) => {
                  return (
                     <View key={index} style={styles.commentContainer}>
                        <Text style={styles.commentContent}>
                           <Text style={styles.commentTitle}>
                              {comment.username}
                           </Text> {comment.comment}
                        </Text>
                     </View>
                  );
               })
            }
            <TouchableOpacity style={styles.replyButtonContainer}>
               <Text style={styles.replyButtonText}
               //  onPress={this.reply}
               >
                  Reply
               </Text>
            </TouchableOpacity>
         </View>
      );
   };
};