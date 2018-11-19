import React, { Component } from 'react';
import { Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';

class CustomRouter extends Component {
   routerReducer (params) {
      const defaultReducer = new Reducer(params);
      return (state, action) => {
         this.props.dispatch(action);
         return defaultReducer(state, action);
      };
   }

   render () {
      return (
         <Router createReducer={this.routerReducer.bind(this)} >
            {this.props.children}
         </Router>
      );
   }
}

export default connect()(CustomRouter);
