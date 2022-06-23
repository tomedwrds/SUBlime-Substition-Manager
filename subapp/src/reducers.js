
import {CREATE_PLAYER,REMOVE_PLAYER,ADD_POSITION,REMOVE_POSITION,UPDATE_NAME,UPDATE_POSITION,UPDATE_INTERVAL_WIDTH, UPLOAD_LAYOUT,UPDATE_SELECTED_POS} from './actions.js';

const iniitalState = {
    
    player_data: [],
    layout_data: [],
    position_data: []
}

function numberReducer(state = iniitalState, action)
{
    switch (action.type)
    {
    
        case CREATE_PLAYER:
            return {...state,player_data: [...state.player_data, action.payload]};
            
        case UPDATE_SELECTED_POS:
            return {...state,player_data: 
                state.player_data.map(
                (content, i) => content.id === action.payload[0] ? {...content, selectedPos: action.payload[1]}
                                        : content
            )}
        
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
        case UPDATE_NAME:
            return {...state,player_data: 
                state.player_data.map(
                (content) => content.id === action.payload[0] ? {...content, name: action.payload[1]}
                                        : content
            )}
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
            return{...state,position_data: action.payload}

        default:
            return state;
    }
}
export default numberReducer