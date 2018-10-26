import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import Lobby from './components/lobby';
import { connect } from 'react-redux';
import Canvas from './components/canvas';
import Homepage from './components/homepage';

const App = ({ name, gameOver, started }) => (

  <div className="App">
    { name && !gameOver ? null : <Homepage /> }
    { name && !started ? <Lobby /> : null }
    <Canvas />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver, started } }) => ({
  name,
  gameOver,
  started
});

export default connect(mapStateToProps)(App);
