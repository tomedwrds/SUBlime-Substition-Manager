

export const CREATE_PLAYER = 'CREATE_PLAYER';

export const create_player = new_player_data => dispatch => {
  dispatch({
    type: CREATE_PLAYER,
    payload: new_player_data,
  });
};

export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const remove_player = player_index => dispatch => {
  dispatch({
    type: REMOVE_PLAYER,
    payload: player_index,
  });
};

export const ADD_POSITION = 'ADD_POSITION';

export const add_position = position_and_index => dispatch => {
  dispatch({
    type: ADD_POSITION,
    payload: position_and_index,
  });
};

export const REMOVE_POSITION = 'REMOVE_POSITION';

export const remove_position = position_and_index => dispatch => {
  dispatch({
    type: REMOVE_POSITION,
    payload: position_and_index,
  });
};

export const UPDATE_NAME = 'UPDATE_NAME';

export const update_name = index_and_name => dispatch => {
  dispatch({
    type: UPDATE_NAME,
    payload: index_and_name,
  });
};

export const UPDATE_POSITION = 'UPDATE_POSITION';

export const update_position = time_name_position_color => dispatch => {
  dispatch({
    type: UPDATE_POSITION,
    payload: time_name_position_color,
  });
};

export const UPDATE_INTERVAL_WIDTH = 'UPDATE_INTERVAL_WIDTH';

export const update_interval_width = id_interval_width => dispatch => {
  dispatch({
    type: UPDATE_INTERVAL_WIDTH,
    payload: id_interval_width,
  });
};