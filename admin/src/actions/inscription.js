import api from '../utils/api';

import {
  GET_INSCRIPTIONS,
  INSCRIPTION_ERROR,
  
  
} from './types';

// Get trainings 

export const getInscriptions = () => async (dispatch) => {
  try {
    const res = await api.get('/inscriptions');
    dispatch({
      type: GET_INSCRIPTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INSCRIPTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};







