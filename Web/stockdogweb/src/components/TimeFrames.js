import React, { Component} from 'react';

class TimeFrame extends Component {
   render() {
      return (
         <button onClick={() => this.props.getData(this.props.timeFrame)}>
            {this.props.text}
         </button>
      );
   }
}

export default TimeFrame;
