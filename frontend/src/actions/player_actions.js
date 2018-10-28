export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const CLEAR_PLAYERS = 'CLEAR_PLAYERS';

export const receivePlayers = players => ({ type: RECEIVE_PLAYERS, players});

export const receivePlayer = player => ({ type: RECEIVE_PLAYER, player });

export const removePlayer = id => ({ type: REMOVE_PLAYER, id });

export const clearPlayers = () => ({ type: CLEAR_PLAYERS });
