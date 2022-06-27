import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import numberReducer from './reducers.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistStore, persistReducer } from 'redux-persist'

const rootReducer = combineReducers({
    numberReducer,
});


const persistConfig = {
    key: 'authType',
    storage: AsyncStorage,
   
  };
  const pReducer = persistReducer(persistConfig, rootReducer);
  const middleware = applyMiddleware(thunk);
  const store = createStore(pReducer, middleware);
  const persistor = persistStore(store);
  export { persistor, store };
