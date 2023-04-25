import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_INTERNSHIPS,
  INTERNSHIP_ERROR,
  DELETE_INTERNSHIP,
  ADD_INTERNSHIP,
  UPDATE_INTERNSHIP,
  GET_INTERNSHIP,
  
  
} from './types';

// Get internships 

export const getInternships = () => async (dispatch) => {
  try {
    const res = await api.get('/internships');

    dispatch({
      type: GET_INTERNSHIPS,
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
    await api.delete(`/internships/${id}`);

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
    const res = await api.post('/internships', formData);

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

// Update Internship
export const updateInternship = (id,formData,navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/internships/${id}`, formData);

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