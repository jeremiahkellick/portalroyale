import { combineReducers } from 'redux';
import gameReducer from './game_reducer';

const rootReducer = combineReducers ({
  game: gameReducer
});

export default rootReducer;
