import {
  ENTER_LOBBY,
  START_GAME,
  GAME_OVER
} from '../actions/game_actions';

const gameReducer = ( state = {}, action ) => {
  Object.freeze(state);
  switch( action.type ) {
    case ENTER_LOBBY:
      return Object.assign({}, state, { name: action.name });
    case START_GAME:
      return Object.assign({}, state, { started: true });
    case GAME_OVER:
      return {};
    default:
      return state;
  }
};

export default gameReducer;
