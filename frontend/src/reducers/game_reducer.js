import {
  START_GAME,
  GAME_OVER,
} from '../actions/game_actions';

const gameReducer = ( state = {}, action ) => {
  Object.freeze(state);
  switch( action.type ) {
    case START_GAME:
      return { name: action.name };
    case GAME_OVER:
      return {};
    default:
      return state;
  }
};

export default gameReducer;
