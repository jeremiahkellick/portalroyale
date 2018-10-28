import {
  ENTER_LOBBY,
  RECEIVE_SOCKET,
  READY_UP,
  START_GAME,
  GAME_OVER,
  WIN,
  RESET_GAME
} from '../actions/game_actions';

const gameReducer = ( state = { gameOver: false }, action ) => {
  Object.freeze(state);
  switch( action.type ) {
    case ENTER_LOBBY:
      return Object.assign({}, state, {
        name: action.name,
        gameOver: false,
        won: false
      });
    case RECEIVE_SOCKET:
      return Object.assign({}, state, { socket: action.socket });
    case READY_UP:
      return Object.assign({}, state, { ready: true });
    case START_GAME:
      return Object.assign({}, state, { started: true, ready: false });
    case GAME_OVER:
      return Object.assign( {}, state, { gameOver: true });
    case WIN:
      return Object.assign({}, state, { won: true });
    case RESET_GAME:
      return Object.assign({}, state, {
        started: false,
        gameOver: false,
        won: false
      });
    default:
      return state;
  }
};

export default gameReducer;
