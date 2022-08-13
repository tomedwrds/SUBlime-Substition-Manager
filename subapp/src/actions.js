

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


export const UPDATE_SELECTED_POS = 'UPDATE_SELECTED_POS';

export const update_selected_pos = index_pos => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_POS,
    payload: index_pos,
  });
};

export const UPDATE_INTERVAL_WIDTH = 'UPDATE_INTERVAL_WIDTH';

export const update_interval_width = id_interval_width => dispatch => {
  dispatch({
    type: UPDATE_INTERVAL_WIDTH,
    payload: id_interval_width,
  });
};

export const UPLOAD_LAYOUT = 'UPLOAD_LAYOUT';

export const update_layout = layout_data => dispatch => {
  dispatch({
    type: UPLOAD_LAYOUT,
    payload: layout_data,
  });
};

export const CREATE_GAME_DATA = 'CREATE_GAME_DATA';

export const create_game_data = sub_data => dispatch => {
  dispatch({
    type: CREATE_GAME_DATA,
    payload: sub_data,
  });
};

export const UPDATE_CURRENT_INTERVAL = 'UPDATE_CURRENT_INTERVAL';

export const update_current_interval = interval => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_INTERVAL,
    payload: interval,
  });
};

export const ADD_SAVE_DATA = 'ADD_SAVE_DATA';

export const add_save_data = data => dispatch => {
  dispatch({
    type: ADD_SAVE_DATA,
    payload: data,
  });
};

export const DELETE_SAVE_DATA = 'DELETE_SAVE_DATA';

export const delete_save_data = id => dispatch => {
  dispatch({
    type: DELETE_SAVE_DATA,
    payload: id,
  });
};

export const UPLOAD_PLAYER_DATA = 'UPLOAD_PLAYER_DATA';

export const upload_player_data = data => dispatch => {
  dispatch({
    type: UPLOAD_PLAYER_DATA,
    payload: data,
  });
};

export const INCREMENT_SAVE_INDEX = 'INCREMENT_SAVE_INDEX';

export const increment_save_index = amount => dispatch => {
  dispatch({
    type: INCREMENT_SAVE_INDEX,
    payload: amount
  });
};


export const INCREMENT_PLAYER_INDEX = 'INCREMENT_PLAYER_INDEX';

export const increment_player_index = amount => dispatch => {
  dispatch({
    type: INCREMENT_PLAYER_INDEX,
    payload: amount
  });
}

export const UPDATE_TEAM_NAME = 'UPDATE_TEAM_NAME';

export const update_team_name = name => dispatch => {
  dispatch({
    type: UPDATE_TEAM_NAME,
    payload: name
  });
}

export const UPDATE_TOTAL_INTERVALS = 'UPDATE_TOTAL_INTERVALS';

export const update_total_intervals = intervals => dispatch => {
  dispatch({
    type: UPDATE_TOTAL_INTERVALS,
    payload: intervals
  });
}


export const UPDATE_INTERVAL_LENGTH = 'UPDATE_INTERVAL_LENGTH';

export const update_interval_length = interval_length => dispatch => {
  dispatch({
    type: UPDATE_INTERVAL_LENGTH,
    payload: interval_length
  });
}


export const LOAD_GAME_DATA = 'LOAD_GAME_DATA';

export const load_game_data = data => dispatch => {
  dispatch({
    type: LOAD_GAME_DATA,
    payload: data
  });
}



export const SHOULD_MIRROR_INTERVALS = 'SHOULD_MIRROR_INTERVALS';

export const should_mirror_intervals = data => dispatch => {
  dispatch({
    type: SHOULD_MIRROR_INTERVALS,
    payload: data
  });
}

export const CREATE_TEAM = 'CREATE_TEAM';

export const create_team = team_data => dispatch => {
  dispatch({
    type: CREATE_TEAM,
    payload: team_data
  });
}

export const INCREMENT_TEAM_INDEX = 'INCREMENT_TEAM_INDEX';

export const increment_team_index = data => dispatch => {
  dispatch({
    type: INCREMENT_TEAM_INDEX,
    payload: data
  });
}
  

export const UPDATE_CURRENT_TEAM_INDEX = 'UPDATE_CURRENT_TEAM_INDEX';

export const update_current_team_index = index => dispatch => {
  dispatch({
    type: UPDATE_CURRENT_TEAM_INDEX,
    payload: index
  });
}
  

export const SAVE_SCHEDULE = 'SAVE_SCHEDULE';

export const save_schedule = data => dispatch => {
  dispatch({
    type: SAVE_SCHEDULE,
    payload: data
  });
}

export const SAVE_GAME = 'SAVE_GAME';

export const save_game = data => dispatch => {
  dispatch({
    type: SAVE_GAME,
    payload: data
  });
}
  
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';

export const delete_schedule = index => dispatch => {
  dispatch({
    type: DELETE_SCHEDULE,
    payload: index
  });
}

export const DELETE_GAME = 'DELETE_GAME';

export const delete_game = index => dispatch => {
  dispatch({
    type: DELETE_GAME,
    payload: index
  });
}
  

export const UPDATE_FORMATION_NAME = 'UPDATE_FORMATION_NAME';

export const update_formation_name = name => dispatch => {
  dispatch({
    type: UPDATE_FORMATION_NAME,
    payload: name
  });
}
  
export const UPDATE_PLAYER_INTERVAL_WIDTH = 'UPDATE_PLAYER_INTERVAL_WIDTH';

export const update_player_interval_width = width => dispatch => {
  dispatch({
    type: UPDATE_PLAYER_INTERVAL_WIDTH,
    payload: width
  });
}


export const UPDATE_PLAYER_POSITIONS_OPEN = 'UPDATE_PLAYER_POSITIONS_OPEN';

export const update_player_positions_open = data => dispatch => {
  dispatch({
    type: UPDATE_PLAYER_POSITIONS_OPEN,
    payload: data
  });
}

export const UPDATE_TEAM_TUTORIAL = 'UPDATE_TEAM_TUTORIAL';

export const update_team_tutorial = data => dispatch => {
  dispatch({
    type: UPDATE_TEAM_TUTORIAL,
    payload: data
  });
}

export const UPDATE_INTERVAL_SELECTOR = 'UPDATE_INTERVAL_SELECTOR';

export const update_interval_selector = data => dispatch => {
  dispatch({
    type: UPDATE_INTERVAL_SELECTOR,
    payload: data
  });
}
