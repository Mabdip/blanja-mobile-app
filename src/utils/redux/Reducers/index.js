import { combineReducers } from "redux";
import authReducer from './auth'
import addressReducer from './address'
import bagReducer from './bag'
import notifReducer from './notification'
const reducers = combineReducers({
  auth : authReducer,
  address: addressReducer,
  bag: bagReducer,
  notification:notifReducer
});

export default reducers;