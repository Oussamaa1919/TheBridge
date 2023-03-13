import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_INTERNSHIPS,
  GET_INTERNSHIP,
  INTERNSHIP_ERROR,
  ADD_APPLICATION
} from './types';




// Get trainings 

export const getInernships = () => async (dispatch) => {
  try {
    const res = await api.get('/inernships');
    dispatch({
      type:GET_INTERNSHIPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get Training
export const getInernship = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/inernships/${id}`);

    dispatch({
      type: GET_INTERNSHIP,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Application
export const addApplication = (internshipId, formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post(`/internships/application/${internshipId}`, formData);

    dispatch({
      type: ADD_APPLICATION,
      payload: res.data
    });

    dispatch(setAlert('Application Sent', 'success'));
    navigate('/internships');
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
