import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');

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

// Register User
export const register = (formData,navigate) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    navigate('/posts');

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password,navigate) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    navigate('/posts');
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
// Change Password
export const changePassword = (currentPassword, newPassword, navigate) => async (
  dispatch
) => {
  const body = { currentPassword, newPassword };

  try {
    const res = await api.put('/auth/password', body);

    dispatch({
      type: PASSWORD_CHANGE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Password updated successfully', 'success'));
    navigate('/home');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PASSWORD_CHANGE_FAIL,
    });
  }
};
// Logout
export const logout = () => ({ type: LOGOUT });
