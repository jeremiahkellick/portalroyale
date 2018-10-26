import { combineReducers } from 'redux';
import gameReducer from './game_reducer';
import playersReducer from './players_reducer';

const uiReducer = combineReducers({
  game: gameReducer,
  players: playersReducer
});

export default uiReducer;
