import { connect } from 'react-redux';
import { initializeGame, resetGame } from '../actions/game_actions';
import GameOver from './game_over';
import { clearStats } from '../actions/stats_actions';

const mapStateToProps = ( { game: { name, gameOver, won }, stats } ) => ({
  formType: gameOver ? "Game Over" : "Enter Game",
  submitText: gameOver ? "Play Again" : "Play",
  name: name || "",
  won,
  stats
})

const mapDispatchToProps = dispatch => ({
  resetGame: () => dispatch(resetGame()),
  initializeGame: (name, online) => dispatch(initializeGame(name, online)),
  clearStats: () => dispatch(clearStats())
});

export default connect( mapStateToProps, mapDispatchToProps )( GameOver );
