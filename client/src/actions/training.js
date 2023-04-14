import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_TRAININGS,
  GET_TRAINING,
  TRAINING_ERROR,
  ADD_INSCRIPTION,
  GET_INSCRIPTIONS,
  DELETE_INSCRIPTION
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

// Add inscription
export const addInscription = (trainingId, formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post(`/trainings/inscription/${trainingId}`, formData);

    dispatch({
      type: ADD_INSCRIPTION,
      payload: res.data
    });

    dispatch(setAlert('Inscription Sent', 'success'));
    navigate('/trainings');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: TRAINING_ERROR
    });
  }
};

export const getInscriptions = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`trainings/user/${userId}/trainings`);
    dispatch({
      type:GET_INSCRIPTIONS,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete inscription for a specific internship
export const deleteInscription = (internshipId, inscriptionId) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')){
  try {
     await api.delete(`trainings/inscription/${internshipId}/${inscriptionId}`);
     window.location.reload();


    dispatch({
      type: DELETE_INSCRIPTION,
      payload: inscriptionId 
    });
    dispatch(setAlert('Apllication Removed', 'success'));
   
  } catch (err) {
    dispatch({
      type: TRAINING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};