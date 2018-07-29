import React, { Component } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

class Feed extends Component {
   constructor(props) {
      super(props);
      this.api = new API();

      this.state = {
         transactions: [],
         feedComponents: []
      }
   }

   componentDidMount() {
      // getting all transactions of a league
      // create the feedComponents
      this.api.getLeagueTransactions(this.props.currLeagueId, data => {
         var feedComponents = [];
         var feedInfoText;
         data.reverse();
         data.forEach((transaction, index) => {
            if (transaction["isBuy"]) {
               feedInfoText = "Bought " + transaction["shareCount"];
            } 
            else {
               feedInfoText = "Sold " + transaction["shareCount"];
            }

            feedComponents.push(
               <div className="feed-item" key={"feed-item-" + index}>
                  <div className="feed-ticker feed-component">
                     <Link to={"/stock/" + transaction["ticker"]}>
                        {transaction["ticker"]}
                     </Link>
                  </div>
                  <div className="feed-date feed-component">
                     {transaction["datetime"].substring(5,10)}
                  </div>
                  <div className="feed-owner feed-component">
                     {transaction["nickname"]}
                  </div>
                  <div className="feed-info feed-component">
                     {feedInfoText}
                  </div>
               </div>
            );
         });
         console.log(data);
         this.setState({feedComponents});
      });
   }

   render() {
      return (
         <div className="Feed">
            {this.state.feedComponents}
         </div>
      );
   }
}

export default Feed;
