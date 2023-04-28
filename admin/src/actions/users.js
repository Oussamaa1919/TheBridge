import api from '../utils/api';
import { setAlert } from './alert';

import {
  
  GET_PROFILES,
  PROFILE_ERROR,
  BLOCK_PROFILE,
  UNBLOCK_PROFILE
  
  
} from './types';

// Get all profiles
export const getProfiles = () => async (dispatch) => {

  try {
    const res = await api.get('/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Block profile
export const blockProfile = (userId) => async (dispatch) => {
  try {
    const res =  await api.put(`/users/block/${userId}`);
    dispatch({
      type: BLOCK_PROFILE,
      payload: res.data 
    });
    dispatch(setAlert('User blocked successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Unblock profile
export const unblockProfile = (userId) => async (dispatch) => {
  try {
   const res =  await api.put(`/users/unblock/${userId}`);
    dispatch({
      type: UNBLOCK_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('User unblocked successfully', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

