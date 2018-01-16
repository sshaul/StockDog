import React, { Component } from 'react';
import {
   BrowserRouter as Router,
   Route
} from 'react-router-dom';

// CSS
import './css/App.css';

// Components
import Login from "./components/Login"

class App extends Component {
   render() {
      return (
         <Router>
            <div className="App">
               <Route exact path="/" component={Login} />
            </div>
         </Router>
      );
   }
}

export default App;
