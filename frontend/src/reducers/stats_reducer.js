import { RECEIVE_STATS, CLEAR_STATS } from '../actions/stats_actions';

export const statsOrder = ['rank', 'kills'];

export const nullStats = () => ({ kills: 0 });

const statsReducer = (state = nullStats(), action) => {
  switch (action.type) {
    case RECEIVE_STATS:
      return Object.assign({}, state, action.stats);
    case CLEAR_STATS:
      return nullStats();
    default:
      return state;
  }
};

export default statsReducer;
