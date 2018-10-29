import React from 'react';
import EnterGameContainer from './enter_game_container';

import { connect } from 'react-redux';

const Homepage = ({ name, gameOver }) => (
  <div className="homepage">
    <header className="App-header">
      <h1>Portal Royale</h1>
    </header>
    <EnterGameContainer />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver } } ) => ({
  name,
  gameOver
});

export default connect( mapStateToProps, null )( Homepage );
