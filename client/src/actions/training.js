import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_TRAININGS,
  GET_TRAINING,
  TRAINING_ERROR,
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


// Get Training
export const getTraining = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/trainings/${id}`);

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

