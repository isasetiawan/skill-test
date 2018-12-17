import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Users from './components/users'
import Header from './components/header'
import'./App.css'
class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Header></Header>
          <Route path='/' exact component={Home}></Route>
          <Route path='/users/' component={Users}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
