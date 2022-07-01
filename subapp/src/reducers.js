
import {CREATE_PLAYER,REMOVE_PLAYER,INCREMENT_PLAYER_INDEX,CREATE_GAME_DATA,ADD_POSITION,REMOVE_POSITION,UPDATE_NAME,UPDATE_POSITION,UPDATE_INTERVAL_WIDTH, UPLOAD_LAYOUT,UPDATE_SELECTED_POS,UPDATE_CURRENT_INTERVAL,ADD_SAVE_DATA,DELETE_SAVE_DATA,UPLOAD_PLAYER_DATA,INCREMENT_SAVE_INDEX, UPDATE_TEAM_NAME, UPDATE_INTERVAL_LENGTH, UPDATE_TOTAL_INTERVALS, LOAD_GAME_DATA} from './actions.js';

import { combineReducers } from 'redux';

const playerState = {
    player_data: [],
    player_index: 0
}

function playerReducer(state = playerState, action)
{
    switch (action.type)
    {
    
        case CREATE_PLAYER:
            
            return {...state,player_data: [...state.player_data, action.payload]};
        case REMOVE_PLAYER:
            return {...state,player_data: state.player_data.filter(item => item.id !== action.payload)};
        case ADD_POSITION:
            return {...state,player_data: 
                state.player_data.map(
                (content, i) => content.id === action.payload[0] ? {...content, positions: [...state.player_data[i].positions, action.payload[1]]}
                                        : content
            )}
        
        case REMOVE_POSITION:
            return {...state,player_data: 
                state.player_data.map(
                (content, i) => content.id === action.payload[0] ? {...content, positions: state.player_data[i].positions.filter(item => item !== action.payload[1])}
                                        : content
            )}
        case UPDATE_SELECTED_POS:
            return {...state,player_data: 
                state.player_data.map(
                (content, i) => content.id === action.payload[0] ? {...content, selectedPos: action.payload[1]}
                                        : content
            )}
         
        case UPDATE_NAME:
            return {...state,player_data: 
                state.player_data.map(
                (content) => content.id === action.payload[0] ? {...content, name: action.payload[1]}
                                        : content
            )}
        case UPLOAD_PLAYER_DATA:
           
            return{...state, player_data:action.payload.player_data, player_index:action.payload.player_index}

        case INCREMENT_PLAYER_INDEX:
            return{...state,player_index: state.player_index+action.payload}
        

        default:
            return state;
    }
}
const positionsState = {
    position_data: [],
    formation_name: ''
}


function positionsReducer(state = positionsState, action)
{
    switch (action.type)
    {
        case UPDATE_POSITION:
           
            return{...state, position_data: state.position_data.map(
                (content, i) => content.position_id === action.payload[2] ?
                    {...content, 
                        position_timeline: state.position_data[i].position_timeline.map((content,i)=> i===action.payload[0] ?
                        {...content, name: action.payload[1], color: action.payload[3]}  : content)}
                                    : content)}
        case UPDATE_INTERVAL_WIDTH:
            return {...state, position_data: state.position_data.map((content) => content.position_id === action.payload[0] ? {...content, position_interval_width:action.payload[1]}:content)}
        
        case UPLOAD_LAYOUT:
            return{...state,position_data: action.payload.position_data, formation_name: action.payload.formation_name}

        default:
            return state;
    }
}

const generalState = {
    game_data: [],
    interval_length: 0,
    total_intervals: 0,
    current_interval: 1,
    team_name: ''
}

function generalReducer(state = generalState, action)
{
    switch (action.type)
    {
        case CREATE_GAME_DATA:
            return{...state,game_data: action.payload}
        
        case UPDATE_CURRENT_INTERVAL:
            return{...state, current_interval: action.payload}
        case UPDATE_TEAM_NAME:
            return{...state,team_name:action.payload}
        case UPDATE_INTERVAL_LENGTH:
            return{...state,interval_length:action.payload}
        case UPDATE_TOTAL_INTERVALS:
            return{...state,total_intervals:action.payload}
        case LOAD_GAME_DATA:
            return{...state, game_data: action.payload.game_data, interval_length: action.payload.interval_length, total_intervals: action.payload.total_intervals,team_name:action.payload.team_name}
        default:
            return state;
    }
}

const savedState = {
    save_data: [],
    save_index: 0

}

function savedReducer(state = savedState, action)
{
    switch (action.type)
    {
        case ADD_SAVE_DATA:
            return{...state,save_data: [...state.save_data, action.payload]}
        
        case DELETE_SAVE_DATA:
            return{...state,save_data: state.save_data.filter(item => item.save_id !== action.payload)};
        
        case INCREMENT_SAVE_INDEX:
            return{...state,save_index: state.save_index+action.payload}
        default:
            return state;
    }
}

export default rootReducer = combineReducers({
    playerReducer,
    positionsReducer,
    generalReducer,
    savedReducer
});
