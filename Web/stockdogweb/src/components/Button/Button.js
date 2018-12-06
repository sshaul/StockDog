import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
   render() {
      return (
         <div className="Button">
            <button type="button" style={{width: this.props.width}}
            disabled={this.props.isDisabled}>
               {this.props.text}
            </button>
         </div>
      );
   }
}

export default Button;
