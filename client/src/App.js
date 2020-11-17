import React, {useState} from 'react';
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

function App() {
  const [filterType, setFilterType] = useState({
    filter: "none",
  });

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/home">
          <Dashboard
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </Route>
        <Route path="/vessel/:id" render={(props) => {
          return( <Vessel id={props.match.params.id} />)
        }} component={Vessel}/>
      </Switch>
    </Router>
    /*<div className="App">
      <Nav />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>test button</Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
     </div>*/
  );
}

export default App;
