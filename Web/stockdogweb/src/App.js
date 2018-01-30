import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route
} from 'react-router-dom';

// CSS
import './css/App.css';

// Components
import Login from "./container/Login";
import Register from "./container/Register";
import Stock from "./container/Stock";

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <Route exact path="/" component={Login} />
               <Route exact path="/register" component={Register} />
               <Route path="/stock/:ticker" component={Stock} />
            </div>
         </Router>
      );
   }
}

export default App;
