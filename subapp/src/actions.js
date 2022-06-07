export const ADD = 'ADD';

export const add = amount => dispatch => {
  dispatch({
    type: ADD,
    payload: amount,
  });
};