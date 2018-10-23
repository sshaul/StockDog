import React, { Component } from 'react';
import {
   BrowserRouter as Router
} from 'react-router-dom';
import AuthenticatedRoute from "components/AuthenticatedRoute";
import UnauthenticatedRoute from "components/UnauthenticatedRoute";
import { withCookies } from "react-cookie";
import { Provider } from 'react-redux';
import store from "./store";

// CSS
import './css/App.css';

// Containers
import Login from "./containers/Login";
import Register from "./containers/Register";
import Stock from "./containers/Stock";
import Portfolio from "./containers/Portfolio"
import JoinLeague from "./containers/JoinLeague";
import CreateLeague from "./containers/CreateLeague";
import LeagueHome from "./containers/LeagueHome";

class App extends Component {
   render() {
      return (
        <Provider store={store}>
           <Router>
              <div className="App">
                 <UnauthenticatedRoute exact path="/" component={Login}
                    appProps={this.props}/>
                 <UnauthenticatedRoute exact path="/register"
                    component={Register} appProps={this.props} />
                 <AuthenticatedRoute exact path="/portfolio" component={Portfolio}
                    appProps={this.props}/>
                 <AuthenticatedRoute path="/stock/:ticker"
                    component={Stock} appProps={this.props}/>
                 <AuthenticatedRoute path="/join-league/"
                  component={JoinLeague} appProps={this.props} />
                 <AuthenticatedRoute path="/create-league/"
                  component={CreateLeague} appProps={this.props} />
                 <AuthenticatedRoute path="/league/:id"
                  component={LeagueHome} appProps={this.props} />
              </div>
           </Router>
         </Provider>
      );
   }
}

export default withCookies(App);
