import React from 'react';
import EnterGameContainer from './enter_game_container';

import { connect } from 'react-redux';

const Homepage = ({ name, gameOver }) => (
  <div className="homepage">
    <EnterGameContainer />
  </div>
);

const mapStateToProps = ({ game: { name, gameOver } } ) => ({
  name,
  gameOver
});

export default connect( mapStateToProps, null )( Homepage );
