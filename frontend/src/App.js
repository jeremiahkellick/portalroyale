import React from 'react';
import { connect } from 'react-redux';
import Canvas from './components/canvas';
import Homepage from './components/homepage';

const App = ({ name, gameOver }) => (

  <div className="App">
    { name && !gameOver ? null : <Homepage /> }
    <Canvas />
  </div>
);

const mapStateToProps = ( { game: { name, gameOver }} ) => ({
  name,
  gameOver
})

export default connect( mapStateToProps )( App );
