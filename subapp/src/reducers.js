import {ADD} from './actions.js';

const iniitalState = {
    number: 20
}

function numberReducer(state = iniitalState, action)
{
    switch (action.type)
    {
        case ADD:
            return {...state,number: state.number + action.payload}
        default:
            return state;
    }
}
export default numberReducer