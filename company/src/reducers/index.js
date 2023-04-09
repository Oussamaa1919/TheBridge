import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import internship from './internship';

export default combineReducers({
  alert,
  auth,
  profile,
  internship,
});
