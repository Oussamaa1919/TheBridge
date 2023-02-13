import {
  
  ADD_INSCRIPTION,
  INSCRIPTION_ERROR
} from '../actions/types';

const initialState = {
  inscrptions: [],
  inscription: null,
  loading: true,
  error: {}
};


function inscriptionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case ADD_INSCRIPTION:
      return {
        ...state,
        inscrptions: [payload, ...state.inscrptions],
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