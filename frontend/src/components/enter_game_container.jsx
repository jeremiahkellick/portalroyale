import { connect } from 'react-redux';
import { initializeGame } from '../actions/game_actions';
import EnterGame from './enter_game';

const mapStateToProps = ( { game: { name, gameOver }} ) => ({
  formType: gameOver ? "Game Over" : "Enter Game",
  submitText: gameOver ? "Play Again" : "Play",
  name: name || ""
})

const mapDispatchToProps = dispatch => ({
  initializeGame: (name) => dispatch(initializeGame(name))
});

export default connect( mapStateToProps, mapDispatchToProps )( EnterGame );
