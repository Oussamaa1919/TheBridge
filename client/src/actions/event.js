import api from '../utils/api';
import { setAlert } from './alert';

import {
 
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  PARTICIPATE_EVENT,
  GET_EVENTS_LIST,
  DELETE_PARTICIPATION
 
} from './types';

// Get internships 

export const getEvents = () => async (dispatch) => {
  try {
    const res = await api.get('/events');
    dispatch({
      type:GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get internship
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

// Add Application
export const Participate = (eventId, formData, navigate) => async (dispatch) => {
  try {
    const res = await api.post(`/events/participate/${eventId}`, formData);

    dispatch({
      type: PARTICIPATE_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Inscription Sent', 'success'));
    navigate('/events');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: EVENT_ERROR
    });
  }
};

// Get internships 

export const getEventsList = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/events/user/${userId}/events`);
    dispatch({
      type:GET_EVENTS_LIST,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete inscription for a specific internship
export const deleteParticipation = (eventId, inscriptionId,navigate) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')){
  try {
     await api.delete(`/events/participation/${eventId}/${inscriptionId}`);
     window.location.reload();


    dispatch({
      type: DELETE_PARTICIPATION,
      payload: inscriptionId 
    });
    dispatch(setAlert('Inscription Removed', 'success'));
   
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
};
