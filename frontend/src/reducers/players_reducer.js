import { RECEIVE_PLAYERS } from '../actions/player_actions';

const playersReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PLAYERS:
      return Object.assign({}, action.players);
    default:
      return state;
  }
};

export default playersReducer;
