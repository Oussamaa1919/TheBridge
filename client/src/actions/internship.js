import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_INTERNSHIPS,
  GET_INTERNSHIP,
  INTERNSHIP_ERROR,
  ADD_APPLICATION
} from './types';




// Get internships 

export const getInternships = () => async (dispatch) => {
  try {
    const res = await api.get('/internships');
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


// Get internship
export const getInternship = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/internships/${id}`);

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
