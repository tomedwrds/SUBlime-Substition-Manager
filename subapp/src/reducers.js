
import {CREATE_PLAYER,REMOVE_PLAYER,ADD_POSITION,REMOVE_POSITION,UPDATE_NAME,UPDATE_POSITION} from './actions.js';

const iniitalState = {
    
    player_data: [],
    position_data: [{position_name: 'CF', position_timeline: new Array(15).fill({name:null, color:null})}]
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
        case UPDATE_POSITION:
            
            return{...state, position_data: state.position_data.map(
                (content, i) => content.position_name === action.payload[2] ?
                    {...content, 
                        position_timeline: state.position_data[i].position_timeline.map((content,i)=> i===action.payload[0] ?
                        {...content, name: action.payload[1], color: action.payload[3]}  : content)}
                                    : content)}
            //change 0 to i
            
            //return {...state, position_data:}
        default:
            return state;
    }
}
export default numberReducer