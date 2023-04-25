import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import training from './training'
import internship from './internship';
import companies from './companies';
import users from './users'
export default combineReducers({
  alert,
  auth,
  training,
  internship,
  companies,
  users,
});
