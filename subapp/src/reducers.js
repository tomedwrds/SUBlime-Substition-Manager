
import {CREATE_PLAYER,SAVE_GAME,UPDATE_TEAM_TUTORIAL,UPDATE_FORMATION_NAME,UPDATE_PLAYER_INTERVAL_WIDTH,REMOVE_PLAYER,INCREMENT_PLAYER_INDEX,CREATE_GAME_DATA,ADD_POSITION,REMOVE_POSITION,UPDATE_NAME,UPDATE_POSITION,UPDATE_INTERVAL_WIDTH, UPLOAD_LAYOUT,UPDATE_SELECTED_POS,UPDATE_CURRENT_INTERVAL,ADD_SAVE_DATA,DELETE_SAVE_DATA,UPLOAD_PLAYER_DATA,INCREMENT_SAVE_INDEX, UPDATE_TEAM_NAME, UPDATE_INTERVAL_LENGTH, UPDATE_TOTAL_INTERVALS, LOAD_GAME_DATA, SHOULD_MIRROR_INTERVALS, CREATE_TEAM, INCREMENT_TEAM_INDEX, UPDATE_CURRENT_TEAM_INDEX, SAVE_SCHEDULE, DELETE_SCHEDULE, DELETE_GAME, UPDATE_PLAYER_POSITIONS_OPEN, UPDATE_INTERVAL_SELECTOR, CREATE_FORMATION, DELETE_FORMATION} from './actions.js';

import { combineReducers } from 'redux';

const teamState = {
    team_data: [],
    team_index: 0

}

function teamReducer(state = teamState, action)
{
    switch (action.type)
    {
        case CREATE_TEAM:
            return{...state,team_data: [...state.team_data, action.payload]}
        
        case DELETE_SAVE_DATA:
            return{...state,team_data: state.team_data.filter(item => item.team_id !== action.payload)};
        
        case INCREMENT_TEAM_INDEX:
            return{...state,team_index: state.team_index+action.payload}
        
        case CREATE_PLAYER:
            
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_player_data: {team_player_index: content.team_player_data.team_player_index+1,team_players:[...state.team_data[i].team_player_data.team_players,action.payload[1]]}
                    }
                : content
            )};
        case REMOVE_PLAYER:
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, 
                    team_player_data: {
                        ...content.team_player_data,
                        team_players:content.team_player_data.team_players.filter(item => item.id !== action.payload[1])}
                    }
                : content
            )};

            
        
        case UPDATE_SELECTED_POS:
             return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, selectedPos: action.payload[2]}
                        : content2)}}
                                            : content
                )}




        case ADD_POSITION:
            return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, positions: [...content2.positions, action.payload[2]]}
                        : content2)}}
                                            : content
                )}

        case REMOVE_POSITION:
            return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, positions: content2.positions.filter(item => item !== action.payload[2])}
                        : content2)}}
                                            : content
                )}

        case UPDATE_NAME:
            return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, name: action.payload[2]}
                        : content2)}}
                                            : content
                )}

        case UPDATE_PLAYER_POSITIONS_OPEN:
            return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, open: !content2.open}
                        : {...content2,open:false})}}
                                            : content
                )}
        case UPDATE_PLAYER_INTERVAL_WIDTH:
            return {...state,team_data: 
                state.team_data.map(
                    (content, i) => content.team_id === action.payload[0] ? {...content, team_player_data: { 
                        ...content.team_player_data,team_players: content.team_player_data.team_players.map((content2,i) => content2.id === action.payload[1] ? 
                        {...content2, intervalWidth: action.payload[2]}
                        : content2)}}
                                            : content
                )}
        case SAVE_SCHEDULE:
            
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_schedule_data: {team_schedule_index: content.team_schedule_data.team_schedule_index+1,team_schedules:[...state.team_data[i].team_schedule_data.team_schedules,action.payload[1]]}
                    }
                : content
            )};
        case SAVE_GAME:
        
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_game_data: {team_game_index: content.team_game_data.team_game_index+1,team_games:[...state.team_data[i].team_game_data.team_games,action.payload[1]]}
                    }
                : content
            )};
        case DELETE_SCHEDULE:
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_schedule_data: {...content.team_schedule_data,team_schedules: content.team_schedule_data.team_schedules.filter(item => item.schedule_id != action.payload[1])}
                    }
                : content
            )};
        case DELETE_GAME:
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_game_data: {...content.team_game_data,team_games: content.team_game_data.team_games.filter(item => item.game_id != action.payload[1])}
                    }
                : content
            )};
        case UPDATE_TEAM_TUTORIAL:
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, 
                    team_tutorial: content.team_tutorial.map((item,i)=>i === action.payload[1] ? false:item)}
                : content
            )};
        case CREATE_FORMATION:
        
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, team_formation_data: {team_formation_index: content.team_formation_data.team_formation_index+1,team_formations:[...state.team_data[i].team_formation_data.team_formations,action.payload[1]]}
                    }
                : content
            )};

        case DELETE_FORMATION:
            return {...state,team_data: 
                state.team_data.map(
                (content,i) => content.team_id === action.payload[0] ? {...content, 
                    team_formation_data: {
                        ...content.team_formation_data,
                        team_formations:content.team_formation_data.team_formations.filter(item => item.layoutId !== action.payload[1])}
                    }
                : content
            )};

           
        default:
            return state;
    }
}

const playerState = {
    player_data: [],
    player_index: 0
}

function playerReducer(state = teamState, action)
{
    switch (action.type)
    {
    
        
            
        
       
        
        
         
        
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
    formation_name: '',
    interval_length: 0,
    total_intervals: 0,
    mirror_intervals:false,
    interval_selector:[]
}



function positionsReducer(state = positionsState, action)
{
    switch (action.type)
    {
        case UPDATE_POSITION:
        
        
            return{...state, position_data: state.position_data.map(
                (content, i) => content.position_id === action.payload[2] ?
                    {...content, 
                    position_timeline: state.position_data[i].position_timeline.map((content,i)=> ((i===action.payload[0] && action.payload[3]== false) || (i%action.payload[4]===action.payload[0]%action.payload[4] && action.payload[3])) ?
                        action.payload[1]  : content)}
                                    : content)}
        case UPDATE_INTERVAL_WIDTH:
            return {...state, position_data: state.position_data.map((content) => content.position_id === action.payload[0] ? {...content, position_interval_width:action.payload[1]}:content)}
        
        case UPLOAD_LAYOUT:
            return{...state,position_data: action.payload[0], formation_name: action.payload[1]}
        case SHOULD_MIRROR_INTERVALS:
            return{...state, mirror_intervals: action.payload}
        case UPDATE_INTERVAL_LENGTH:
                return{...state,interval_length:action.payload}
        case UPDATE_TOTAL_INTERVALS:
                return{...state,total_intervals:action.payload}
        case UPDATE_INTERVAL_SELECTOR:
            return{...state,interval_selector:action.payload}
        default:
            return state;
    }
}

const generalState = {
    game_data: [],
    
    current_interval: 1,
    team_name: '',
    formation_name: '',
   
    current_team_index:0
}

function generalReducer(state = generalState, action)
{
    switch (action.type)
    {
        case UPDATE_CURRENT_TEAM_INDEX:
            return{...state, current_team_index: action.payload}
        case CREATE_GAME_DATA:
            return{...state,game_data: action.payload}
        
        case UPDATE_CURRENT_INTERVAL:
            return{...state, current_interval: action.payload}
        case UPDATE_TEAM_NAME:
            return{...state,team_name:action.payload}
        case UPDATE_FORMATION_NAME:
            return{...state,formation_name:action.payload}
       
        case LOAD_GAME_DATA:
            return{...state, game_data: action.payload.game_data, interval_length: action.payload.interval_length, total_intervals: action.payload.total_intervals,team_name:action.payload.team_name, mirror_intervals: action.payload.mirror_intervals}
        
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
    savedReducer,
    teamReducer
});


