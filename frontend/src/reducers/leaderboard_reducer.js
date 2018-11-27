import { RECEIVE_LEADERBOARDS } from '../actions/leaderboard_actions';

const leaderboardReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LEADERBOARDS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default leaderboardReducer;