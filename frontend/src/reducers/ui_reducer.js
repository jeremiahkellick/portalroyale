import { combineReducers } from 'redux';
import gameReducer from './game_reducer';

const uiReducer = combineReducers({
  game: gameReducer
});

export default uiReducer;
