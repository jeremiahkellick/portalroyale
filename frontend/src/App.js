import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import { connect } from 'react-redux';

const App = ({name}) => (

  <div className="App">
    { name ? null : <Homepage /> }
    <Canvas />
  </div>
);

const mapStateToProps = ({ ui: { game: { name } } }) => ({
  name
});

export default connect( mapStateToProps, null )( App );
