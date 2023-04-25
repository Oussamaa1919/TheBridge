import api from '../utils/api';
import { setAlert } from './alert';
import {
  
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
 
} from './types';


// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/admin');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
// Login User
export const login = (email, password,navigate) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/admin', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    navigate('/home');

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// Logout
export const logout = () => ({ type: LOGOUT });