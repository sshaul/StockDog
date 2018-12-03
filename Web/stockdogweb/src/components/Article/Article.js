import React, { Component } from 'react';
import './Article.css';

class Article extends Component {
   render() {
      return (
         <div className="Article">
            <h1>{this.props.title}</h1>
            <p>{this.props.content}</p>
         </div>
      );
   }
}

export default Article;
