import { connect } from 'react-redux';
import { initializeGame, resetGame } from '../actions/game_actions';
import EnterGame from './enter_game';

const mapStateToProps = ( { game: { name, gameOver, won } } ) => ({
  formType: gameOver ? "Game Over" : "Enter Game",
  submitText: gameOver ? "Play Again" : "Play",
  name: name || "",
  won
})

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
  initializeGame: (name) => dispatch(initializeGame(name))
});

export default connect( mapStateToProps, mapDispatchToProps )( EnterGame );
