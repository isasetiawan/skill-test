import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Home from './components/home'
import Users from './components/users'
import User from './components/user'
// import Header from './components/header'
import'./App.css'
class App extends Component {
  render() {
    return (
      <div className="App" >
        <Router>
            <Switch>
              <Route path='/' exact component={Users}></Route>
              <Route path='/:userId' component={User}></Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
