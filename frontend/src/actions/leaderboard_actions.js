import axios from 'axios';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';
export const RECEIVE_LEADERBOARDS = 'RECEIVE_LEADERBOARDS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const fetchStats = () => dispatch => {
  axios
    .get('/api/stats')
    .then(res =>
      dispatch({
        type: RECEIVE_LEADERBOARDS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_LEADERBOARDS,
        payload: null
      })
    );
};

export const fetchStat = id => dispatch => {
  axios
    .get(`/api/stats/${id}`)
    .then(res =>
      dispatch({
        type: RECEIVE_LEADERBOARD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_LEADERBOARD,
        payload: null
      })
    );
};

export const createStat = statData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/stats', statData)
    .then(res =>
      dispatch({
        type: RECEIVE_LEADERBOARD,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: RECEIVE_ERRORS,
        payload: err.response.data
      })
    );
};


// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};