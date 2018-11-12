import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import Lobby from './components/lobby';
import { connect } from 'react-redux';
import Header from './components/header';
import { Route } from 'react-router-dom';

const App = ({ name, gameOver, started }) => (

  <div className="App">
    <Route path="/" component={ name ? null : Header } />
    <Route exact path="/" component={ name && !gameOver ? null : Homepage } />
    <Route exact path="/" component={ name && !started ? Lobby : null } />
    <Route exact path="/" component={ Canvas } />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver, started } }) => ({
  name,
  gameOver,
  started
});

export default connect(mapStateToProps)(App);
