import React from 'react';
import EnterGameContainer from './enter_game_container';
import GameOverContainer from './game_over_container';
import Tutorial from './tutorial';
import { connect } from 'react-redux';

const Homepage = ({ name, gameOver }) => (
  <div className="homepage">
    { gameOver ? <GameOverContainer /> : <EnterGameContainer /> }
    <Tutorial />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver } } ) => ({
  name,
  gameOver
});

export default connect( mapStateToProps, null )( Homepage );
