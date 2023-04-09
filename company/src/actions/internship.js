import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_MYINTERNSHIPS,
  INTERNSHIP_ERROR,
  DELETE_INTERNSHIP,
  ADD_INTERNSHIP,
  UPDATE_INTERNSHIP,
  GET_INTERNSHIP,
  DELETE_ALLINTERNSHIP,
  
  
} from './types';

// Get internships 

export const getMyInternships = () => async (dispatch) => {
  try {
    const res = await api.get('/company/myinternships');
    dispatch({
      type: GET_MYINTERNSHIPS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Internship
export const deleteInternship = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
  try {
    await api.delete(`/company/internship/${id}`);

    dispatch({
      type: DELETE_INTERNSHIP,
      payload: id
    });

    dispatch(setAlert('Internship Removed', 'success'));
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
};

// Add Internship
export const addInternship = (formData,navigate) => async (dispatch) => {
  try {
    const res = await api.post('/company/addinternship', formData);

    dispatch({
      type: ADD_INTERNSHIP,
      payload: res.data
    });

    dispatch(setAlert('Internship Created', 'success'));
    navigate('/internships');
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Training
export const getInternship = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/company/${id}`);

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

// Update Internship
export const updateInternship = (id,formData,navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/company/updateinternship/${id}`, formData);

    dispatch({
      type: UPDATE_INTERNSHIP,
      payload: res.data
    });

    dispatch(setAlert('Internship Updated', 'success'));
    navigate('/internships');
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
  
};

// Delete All Internship
export const deleteAllInternship = (navigate) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
  try {
   const res =  await api.delete('/company/deleteinternships');

    dispatch({
      type: DELETE_ALLINTERNSHIP,
      payload: res.data
    });

    dispatch(setAlert('ALL Internships Are Removed', 'success'));
    navigate('/internships');
  } catch (err) {
    dispatch({
      type: INTERNSHIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
};