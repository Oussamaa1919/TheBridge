import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_COMPANIES,
  COMPANY_ERROR,
  
  
} from './types';

// Get companies 

export const getCompanies = () => async (dispatch) => {
  try {
    const res = await api.get('/companies/companyprofiles');
    console.log(res.data);
    console.log('helooo');
    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

