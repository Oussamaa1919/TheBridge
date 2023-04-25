import {
 
  PROFILE_ERROR,
 
  GET_PROFILES,
 
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  
  loading: true,
  error: {}
};

function usersReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    
    
    
    default:
      return state;
  }
}

export default usersReducer;
