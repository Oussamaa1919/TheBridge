import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_EVENTS,
  EVENT_ERROR,
  DELETE_EVENT,
  ADD_EVENT,
  UPDATE_EVENT,
  GET_EVENT,
  
  
} from './types';

// Get internships 

export const getEvents = () => async (dispatch) => {
  try {
    const res = await api.get('/events');

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Internship
export const deleteEvent = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
  try {
    await api.delete(`/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
};

// Add Internship
export const addEvent = (formData,navigate) => async (dispatch) => {
  try {
    const res = await api.post('/events', formData);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Created', 'success'));
    navigate('/Events');
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Training
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Internship
export const updateEvent = (id,formData,navigate) => async (dispatch) => {
  try {
    const res = await api.put(`/events/${id}`, formData);

    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Updated', 'success'));
    navigate('/events');
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};