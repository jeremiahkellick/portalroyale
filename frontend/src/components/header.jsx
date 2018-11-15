import React from 'react';
import NavBar from './navbar';
import { Switch, Route, Link } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <header className="App-header">
      <Link to="/"><h1>Portal Royale</h1></Link>
    </header>
    <Switch>
      <Route path="/lobby" component={ null } />
      <Route path="/" component={ NavBar } />
    </Switch>
  </div>
);

export default Header;