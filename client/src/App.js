import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import Vessel from './components/Vessel.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute.js'

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
        <Header 
          user={this.state.user} 
          isLoggedIn={this.state.isLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Login 
              user={this.state.user} 
              isLoggedIn={this.state.isLoggedIn}
              onSuccessfulLogin={this.onSuccessfulLogin}
            />
          </Route>
          <ProtectedRoute 
            path="/home/" 
            user={this.state.user}
            isLoggedIn={this.state.isLoggedIn} 
            component={Dashboard}
          />
          <Route path="/vessel/:id" render={(props) => {
            return( <Vessel id={props.match.params.id} />)
          }} component={Vessel}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
