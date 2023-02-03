import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import training from './training'

export default combineReducers({
  alert,
  auth,
  training,

});
