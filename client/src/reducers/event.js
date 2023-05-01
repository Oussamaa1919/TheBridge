import {
 
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  PARTICIPATE_EVENT,
  GET_EVENTS_LIST,
  DELETE_PARTICIPATION,
}from '../actions/types'

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {}
};


function eventReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS_LIST:
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
      case DELETE_PARTICIPATION:
  return {
    ...state,
    events: state.events.map((event) =>
      event._id === payload.eventId
        ? {
            ...event,
            inscriptions: event.inscriptions.filter(
              (inscription) => inscription._id !== payload.inscriptionId
            ),
          }
        : event
    ),
    loading: false,
  };

      case PARTICIPATE_EVENT:
      return {
        ...state,
        event: { ...state.event, inscriptions: payload },
        loading: false
      };
    
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }; 
   
    default:
      return state;
  }
}

export default eventReducer;
