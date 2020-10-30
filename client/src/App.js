import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userId: ""
    }
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
