import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route
} from 'react-router-dom';

// CSS
import './css/App.css';

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Stock from "./components/Stock";

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <Route exact path="/" component={Login} />
               <Route exact path="/register" component={Register} />
               <Route exact path="/stock" component={Stock} />
            </div>
         </Router>
      );
   }
}

export default App;
