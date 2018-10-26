import * as GameUtil from '../util/game_util';

export const ENTER_LOBBY = "ENTER_LOBBY";
export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";

const enterLobby = (name) => ({
  type: ENTER_LOBBY,
  name
});

export const gameOver = () => ({
  type: GAME_OVER
});

export const initializeGame = name => dispatch => {
  GameUtil.initializeGame(name, dispatch);
  dispatch(enterLobby(name));
}

export const startGame = () => ({ type: START_GAME });
