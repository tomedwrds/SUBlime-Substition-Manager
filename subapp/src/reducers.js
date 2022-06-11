
import {CREATE_PLAYER,REMOVE_PLAYER,ADD_POSITION,REMOVE_POSITION,UPDATE_NAME} from './actions.js';

const iniitalState = {
    
    player_data: []
}

function numberReducer(state = iniitalState, action)
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
        case UPDATE_NAME:
            return {...state,player_data: 
                state.player_data.map(
                (content) => content.id === action.payload[0] ? {...content, name: action.payload[1]}
                                        : content
            )}
        default:
            return state;
    }
}
export default numberReducer