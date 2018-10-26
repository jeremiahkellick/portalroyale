import {
  START_GAME,
  GAME_OVER,
} from '../actions/game_actions';

const gameReducer = ( state = { gameOver: false }, action ) => {
  Object.freeze(state);
  switch( action.type ) {
    case START_GAME:
      return { name: action.name, gameOver: false };
    case GAME_OVER:
      return Object.assign( {}, state, { gameOver: true })
    default:
      return state;
  }
};

export default gameReducer;
