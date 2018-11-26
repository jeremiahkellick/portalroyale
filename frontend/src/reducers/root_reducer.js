import { combineReducers } from 'redux';
import gameReducer from './game_reducer';
import playersReducer from './players_reducer';
import statsReducer from './stats_reducer';
import leaderboardReducer from './leaderboard_reducer';

const rootReducer = combineReducers ({
  game: gameReducer,
  players: playersReducer,
  stats: statsReducer,
  leaderboard: leaderboardReducer
});

export default rootReducer;
