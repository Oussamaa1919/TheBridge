import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import training from './training'
import inscription from './inscription'

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  training,
  inscription,
  
});
