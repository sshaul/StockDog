import React, { Component } from 'react';
import {
   BrowserRouter as Router
} from 'react-router-dom';
import AuthenticatedRoute from "components/AuthenticatedRoute";
import UnauthenticatedRoute from "components/UnauthenticatedRoute";
import { withCookies } from "react-cookie";

// CSS
import './css/App.css';

// Containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Stock from "./containers/Stock";
import Profile from "./containers/Profile"

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <UnauthenticatedRoute exact path="/" component={Login}
                  appProps={this.props}/>
               <UnauthenticatedRoute exact path="/register" 
                  component={Register} appProps={this.props} />
               <AuthenticatedRoute exact path="/profile" component={Profile} 
                  appProps={this.props}/>
               <UnauthenticatedRoute path="/stock/:ticker" component={Stock} 
                  appProps={this.props}/>
            </div>
         </Router>
      );
   }
}

export default withCookies(App);
