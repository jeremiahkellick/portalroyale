import React from 'react';
import NavBar from './navbar';
import { Switch, Route } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <header className="App-header">
      <h1>Portal Royale</h1>
    </header>
    <Switch>
      <Route path="/lobby" component={ null } />
      <Route path="/" component={ NavBar } />
    </Switch>
  </div>
);

export default Header;