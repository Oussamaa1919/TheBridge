import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_COMPANIES,
  COMPANY_ERROR,
  VERIFY_COMPANY,
  
  
} from './types';

// Get companies 

export const getCompanies = () => async (dispatch) => {
  try {
    const res = await api.get('/companies/companyprofiles');
    
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

export const verifyCompany = (companyId) => async (dispatch) => {
  try {
  const res =  await api.put(`/companies/company/verify/${companyId}`);
  window.location.reload();

    dispatch({
      type: VERIFY_COMPANY,
      payload:  res.data
    });

    dispatch(setAlert('Company Verified', 'success'));
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

