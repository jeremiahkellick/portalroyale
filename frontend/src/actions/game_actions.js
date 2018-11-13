import * as GameUtil from '../util/game_util';

export const ENTER_LOBBY = "ENTER_LOBBY";
export const RECEIVE_SOCKET = "RECEIVE_SOCKET";
export const READY_UP = "READY_UP";
export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";
export const WIN = "WIN";
export const RESET_GAME = "RESET_GAME";

export const enterLobby = (name) => ({ type: ENTER_LOBBY, name });

export const receiveSocket = socket => ({ type: RECEIVE_SOCKET, socket });

export const readyUp = () => ({ type: READY_UP });

export const gameOver = () => ({ type: GAME_OVER });

export const win = () => ({ type: WIN });

export const initializeGame = (name, online) => dispatch => {
  GameUtil.initializeGame(name, online, dispatch);
  dispatch(enterLobby(name));
}

export const startGame = () => ({ type: START_GAME });

export const resetGame = () => ({ type: RESET_GAME });
