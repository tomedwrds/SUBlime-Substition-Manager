import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistStore, persistReducer } from 'redux-persist'



const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [/*'savedReducer'*/]
   
  };
  const pReducer = persistReducer(persistConfig, rootReducer);
  const middleware = applyMiddleware(thunk);
  const store = createStore(pReducer, middleware);
  const persistor = persistStore(store);
  export { persistor, store };
