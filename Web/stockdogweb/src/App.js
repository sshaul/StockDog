import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route
} from 'react-router-dom';

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
               <Route exact path="/" component={Login} />
               <Route exact path="/register" component={Register} />
               <Route exact path="/profile" component={Profile} />
               <Route path="/stock/:ticker" component={Stock} />
            </div>
         </Router>
      );
   }
}

export default App;
