export const RECEIVE_STATS = 'RECEIVE_STATS';
export const CLEAR_STATS = 'CLEAR_STATS';

export const receiveStats = stats => ({ type: RECEIVE_STATS, stats });

export const clearStats = () => ({ type: CLEAR_STATS });
