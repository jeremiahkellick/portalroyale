import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER,
  REMOVE_PLAYER,
  CLEAR_PLAYERS
} from '../actions/player_actions';

const playersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PLAYERS:
      return Object.assign({}, state, action.players);
    case RECEIVE_PLAYER:
      return Object.assign({}, state, { [action.player.id]: action.player });
    case REMOVE_PLAYER:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    case CLEAR_PLAYERS:
      return {};
    default:
      return state;
  }
};

export default playersReducer;
