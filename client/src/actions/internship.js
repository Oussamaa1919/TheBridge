import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_INTERNSHIPS,
  GET_INTERNSHIP,
  INTERNSHIP_ERROR,
  ADD_APPLICATION,
  GET_APPLICATIONS,
  DELETE_APPLICATION
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
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: INTERNSHIP_ERROR
    });
  }
};

// Get internships 

export const getApplications = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/internships/user/${userId}/internships`);
    dispatch({
      type:GET_APPLICATIONS,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete inscription for a specific internship
export const deleteApplication = (internshipId, inscriptionId,navigate) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')){
  try {
     await api.delete(`/internships/application/${internshipId}/${inscriptionId}`);
     window.location.reload();


    dispatch({
      type: DELETE_APPLICATION,
      payload: inscriptionId 
    });
    dispatch(setAlert('Apllication Removed', 'success'));
   
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};
