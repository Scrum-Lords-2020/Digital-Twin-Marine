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
      user: {}
    }

    this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
  }

  onSuccessfulLogin(u) {
    this.setState({
      isLoggedIn: true,
      user: u
    });
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login 
              user={this.state.user} 
              isLoggedIn={this.state.isLoggedIn}
              onSuccessfulLogin={this.onSuccessfulLogin}
            />
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
