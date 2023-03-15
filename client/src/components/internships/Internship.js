import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {  useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getInternship} from '../../actions/internship';
import Spinner from '../layout/Spinner';
import InternshipForm from './InternshipForm';
const Internship = ({getInternship, internship:{internship, loading}}) => {
  
  const { id } = useParams();

  useEffect(() => {
    getInternship(id);
  }, [getInternship, id]);
  
  return loading || internship === null ? (
    <Spinner />
  ) : ( 

<div >
      
      <InternshipForm   internship={internship}/>
    </div>


  )}

  Internship.propTypes ={
    internship: PropTypes.object.isRequired,
    getInternship: PropTypes.func.isRequired,
   }
   
   const mapStateToProps = (state) => ({
     internship: state.internship
   });
   export default connect(mapStateToProps, {getInternship})(Internship)