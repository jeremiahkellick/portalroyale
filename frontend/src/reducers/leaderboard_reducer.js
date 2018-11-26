import {
    RECEIVE_LEADERBOARD,
    RECEIVE_LEADERBOARDS
  } from '../actions/leaderboard_actions';

const leaderboardReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LEADERBOARDS:
      return Object.assign({}, state, action.payload);
    case RECEIVE_LEADERBOARD:
    // const transactions = state.transactions;
    // const newTransaction = { [state.transactions.length]: action.payload };
    // const updatedTransactions = Object.assign(transactions, newTransaction);
    // return {
    //   ...state,
    //   transaction: action.payload,
    //   transactions: updatedTransactions,
    //   loading: false
    // };
      return;
    default:
      return state;
  }
};

export default leaderboardReducer;