import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  ADD_INSCRIPTION,
  INSCRIPTION_ERROR,
} from './types';

// Add post
export const addInscription = (formData,navigate) => async (dispatch) => {
  try {
    const res = await api.post('/inscriptions', formData);

    dispatch({
      type: ADD_INSCRIPTION,
      payload: res.data
    });

    dispatch(setAlert('Incription Sent', 'success'));
    navigate('/trainings');
  } catch (err) {
    dispatch({
      type: INSCRIPTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};