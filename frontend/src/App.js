import React from 'react';
import Canvas from './components/canvas';
import Homepage from './components/homepage'
import {Switch, Router} from 'react-router-dom';
import { connect } from 'react-redux';

const App = ({name}) => (

  <div className="App">
    { name ? null : <Homepage /> }
    <Canvas />
  </div>
);

const mapStateToProps = ({ game: { name } }) => ({
  name
});

export default connect( mapStateToProps, null )( App );
