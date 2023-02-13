import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import training from './training'
import inscription from './inscription';
export default combineReducers({
  alert,
  auth,
  training,
  inscription,

});
