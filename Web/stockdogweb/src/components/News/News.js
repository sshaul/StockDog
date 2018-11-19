import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "./News.css";

class News extends Component {
   
   generateHeadlines = () => {
      const headlineObjs = this.props.headlines;
      var headlines = [];

      headlineObjs.forEach(headline => {
         headlines.push(
            <h2 onClick={() => this.props.history.push(headline.link)}>{headline.title}</h2>
         );
      });

      return headlines;
   }

   render() {
      return (
         <div className="News">
            <h1>Today's Headlines</h1>
            {this.generateHeadlines()}
         </div>
      );
   }
}

export default withRouter(News);