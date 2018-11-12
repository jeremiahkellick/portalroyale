import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import Lobby from './components/lobby';
import { connect } from 'react-redux';
import Header from './components/header';
import About from './components/about';
import { Route, withRouter } from 'react-router-dom';

const App = ({ name, gameOver, started }) => (

  <div className="App">
    <Route path="/" component={ name ? null : Header } />
    <Route exact path="/" component={ name && !gameOver ? null : Homepage } />
    <Route exact path="/" component={ name && !started ? Lobby : null } />
    <Route exact path="/" component={ Canvas } />
    <Route exact path="/about" component={ About } />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver, started } }) => ({
  name,
  gameOver,
  started
});

export default withRouter(connect(mapStateToProps)(App));
