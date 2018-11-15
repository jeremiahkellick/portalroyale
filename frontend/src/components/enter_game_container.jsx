import { connect } from 'react-redux';
import { initializeGame } from '../actions/game_actions';
import EnterGame from './enter_game';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ( { game: { name } } ) => ({
  name: name || "",
})

const mapDispatchToProps = dispatch => ({
  initializeGame: (name, online) => dispatch(initializeGame(name, online)),
});

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( EnterGame ));
