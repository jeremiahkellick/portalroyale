import { combineReducers } from 'redux';
import gameReducer from './game_reducer';
import playersReducer from './players_reducer';

const rootReducer = combineReducers ({
  game: gameReducer,
  players: playersReducer
});

export default rootReducer;
