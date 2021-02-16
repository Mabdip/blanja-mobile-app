import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'; 



import reducers from "./Reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth','bag'], //redux yang mau di persist
  };

const logger = createLogger();

const enhancers = applyMiddleware(promiseMiddleware, logger);

const persistedReducer = persistReducer(persistConfig, reducers)

const reduxStore = createStore(persistedReducer, enhancers);

export default reduxStore;