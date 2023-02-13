import {
  GET_INSCRIPTIONS,
  INSCRIPTION_ERROR,
  
}from '../actions/types'

const initialState = {
  inscriptions: [],
  inscription: null,
  loading: true,
  error: {}
};


function inscriptionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INSCRIPTIONS:
      return {
        ...state,
        inscriptions: payload,
        loading: false
      };
    
    
    case INSCRIPTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }; 
   
    default:
      return state;
  }
}

export default inscriptionReducer;
