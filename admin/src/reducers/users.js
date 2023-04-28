import {
 
  PROFILE_ERROR,
  BLOCK_PROFILE,
  UNBLOCK_PROFILE,
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
      case BLOCK_PROFILE:
        case UNBLOCK_PROFILE:
          return {
            ...state,
            profiles: state.profiles.map((profile) =>
              profile.user._id === action.payload.user._id ? action.payload : profile
            )
          };
      
      
    
    default:
      return state;
  }
}

export default usersReducer;
