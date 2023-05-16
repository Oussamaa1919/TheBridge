import { 
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  admin: null
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
      case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        admin: {
          ...state.admin,
          password: payload.password
        }
      };
    case PASSWORD_CHANGE_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: null
      };
    default:
      return state;
  }
}

export default authReducer;
