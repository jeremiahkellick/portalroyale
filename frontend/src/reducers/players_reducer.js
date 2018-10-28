import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER,
  REMOVE_PLAYER,
  CLEAR_PLAYERS,
  READY_PLAYER,
} from '../actions/player_actions';

const playersReducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PLAYERS:
      return Object.assign({}, state, action.players);
    case RECEIVE_PLAYER:
      return Object.assign({}, state, { [action.player.id]: action.player });
    case REMOVE_PLAYER:
      delete newState[action.id];
      return newState;
    case CLEAR_PLAYERS:
      return {};
    case READY_PLAYER:
      newState[action.id].ready = true;
      return newState;
    default:
      return state;
  }
};

export default playersReducer;
