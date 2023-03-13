import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import training from './training'
import internship from './internship'

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  training,
  internship
  
});
