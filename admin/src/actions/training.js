import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_TRAININGS,
  TRAINING_ERROR,
  DELETE_TRAINING,
  ADD_TRAINING,
  UPDATE_TRAINING,
  GET_TRAINING,
  
} from './types';

// Get trainings 

export const getTrainings = () => async (dispatch) => {
  try {
    const res = await api.get('/trainings');
    dispatch({
      type: GET_TRAININGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Training
export const deleteTraining = (id) => async (dispatch) => {
  try {
    await api.delete(`/trainings/${id}`);

    dispatch({
      type: DELETE_TRAINING,
      payload: id
    });

    dispatch(setAlert('Training Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Training
export const addTraining = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/training', formData);

    dispatch({
      type: ADD_TRAINING,
      payload: res.data
    });

    dispatch(setAlert('Training Created', 'success'));
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Training
export const getTraining = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/training/${id}`);

    dispatch({
      type: GET_TRAINING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};