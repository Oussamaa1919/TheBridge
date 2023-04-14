import {
 
  INTERNSHIP_ERROR, 
  GET_INTERNSHIPS,
  GET_INTERNSHIP,
  ADD_APPLICATION,
  GET_APPLICATIONS,
  DELETE_APPLICATION,
}from '../actions/types'

const initialState = {
  internships: [],
  internship: null,
  loading: true,
  error: {}
};


function internshipReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPLICATIONS:
    case GET_INTERNSHIPS:
      return {
        ...state,
        internships: payload,
        loading: false
      };
    case GET_INTERNSHIP:
      return {
        ...state,
        internship: payload,
        loading: false
      };
      case DELETE_APPLICATION:
  return {
    ...state,
    internships: state.internships.map((internship) =>
      internship._id === payload.internshipId
        ? {
            ...internship,
            inscriptions: internship.inscriptions.filter(
              (inscription) => inscription._id !== payload.inscriptionId
            ),
          }
        : internship
    ),
    loading: false,
  };

      case ADD_APPLICATION:
      return {
        ...state,
        internship: { ...state.internship, inscriptions: payload },
        loading: false
      };
    
    case INTERNSHIP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }; 
   
    default:
      return state;
  }
}

export default internshipReducer;
