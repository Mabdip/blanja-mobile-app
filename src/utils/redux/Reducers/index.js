import { combineReducers } from "redux";
import auth from './auth'
import address from './address'
import bag from './bag'
import notification from './notification'
const reducers = combineReducers({
  auth,
  address,
  bag,
  notification,
});

export default reducers;
