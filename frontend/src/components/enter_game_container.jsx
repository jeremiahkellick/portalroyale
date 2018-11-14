import { connect } from 'react-redux';
import { initializeGame, resetGame } from '../actions/game_actions';
import EnterGame from './enter_game';

const mapStateToProps = ( { game: { name } } ) => ({
  name: name || "",
})

const mapDispatchToProps = dispatch => ({
  initializeGame: (name, online) => dispatch(initializeGame(name, online)),
});

export default connect( mapStateToProps, mapDispatchToProps )( EnterGame );
