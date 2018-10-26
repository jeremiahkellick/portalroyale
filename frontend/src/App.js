import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import Lobby from './components/lobby';
import { connect } from 'react-redux';

const App = ({ name, started }) => (

  <div className="App">
    { name ? null : <Homepage /> }
    { name && !started && <Lobby /> }
    <Canvas />
  </div>
);

const mapStateToProps = ({ ui: { game: { name, started } } }) => ({
  name,
  started
});

export default connect( mapStateToProps, null )( App );
