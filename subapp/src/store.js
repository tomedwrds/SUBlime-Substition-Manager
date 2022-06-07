import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import numberReducer from './reducers.js';
const rootReducer = combineReducers({
    numberReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));