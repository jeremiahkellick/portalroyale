import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import Lobby from './components/lobby';
import Header from './components/header';
import About from './components/about';
import { Route, withRouter, Switch } from 'react-router-dom';


const App = () => (

  <div className="App">
    <Route path="/" component={  Header } />
    <Switch>
      <Route exact path="/" component={ Homepage } />
      <Route exact path="/lobby" component={ Lobby } />
      <Route exact path="/about" component={ About } />
    </Switch>
    <Route path="/" component={ Canvas } />
  </div>
);

export default withRouter(App);
