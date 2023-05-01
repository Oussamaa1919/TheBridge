import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import training from './training'
import internship from './internship'
import event from './event';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  training,
  internship,
  event
  
});
