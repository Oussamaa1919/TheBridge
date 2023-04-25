import {
  GET_COMPANIES,
  COMPANY_ERROR
  
}from '../actions/types'

const initialState = {
  profiles: [],
  profile: null, 
  loading: true,
  error: {}
  
};


function companiesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case GET_COMPANIES:
      return {
        ...state,
       profiles: payload,
        loading: false
      };
      
      
     
    
    
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }; 
   
    default:
      return state;
  }
}

export default companiesReducer;
