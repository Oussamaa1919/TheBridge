import {
 
  TRAINING_ERROR,
 
  GET_TRAININGS,
  GET_TRAINING,
  ADD_INSCRIPTION
}from '../actions/types'

const initialState = {
  trainings: [],
  training: null,
  loading: true,
  error: {}
};


function trainingReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TRAININGS:
      return {
        ...state,
        trainings: payload,
        loading: false
      };
    case GET_TRAINING:
      return {
        ...state,
        training: payload,
        loading: false
      };

      case ADD_INSCRIPTION:
      return {
        ...state,
        training: { ...state.training, inscriptions: payload },
        loading: false
      };
    
    case TRAINING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }; 
   
    default:
      return state;
  }
}

export default trainingReducer;
