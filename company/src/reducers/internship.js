import {
  GET_MYINTERNSHIPS,
  INTERNSHIP_ERROR,
  DELETE_INTERNSHIP,
  ADD_INTERNSHIP,
  UPDATE_INTERNSHIP,
  GET_INTERNSHIP,
  DELETE_ALLINTERNSHIP,
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
    
    case GET_MYINTERNSHIPS:
      return {
        ...state,
        internships: payload,
        loading: false
      };
      case DELETE_ALLINTERNSHIP:
      return {
        ...state,
        internships: payload,
        loading: false,
        error: null,
      };
    case GET_INTERNSHIP:
      return {
        ...state,
        internship: payload,
        loading: false
      };
    case ADD_INTERNSHIP:
    case UPDATE_INTERNSHIP:
      return {
        ...state,
        internships: [payload, ...state.internships],
        loading: false
      };
    case DELETE_INTERNSHIP:
      return {
        ...state,
        internships: state.internships.filter((internship) => internship._id !== payload),
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
