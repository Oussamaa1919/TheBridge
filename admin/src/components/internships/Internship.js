import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInternship } from '../../actions/internships';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router-dom';
import EditInternshipForm from './EditInternshipForm';

const Internship = ({getInternship, internship:{internship, loading}}) => {
  const { id } = useParams();
  useEffect(() => {
    getInternship(id);
  }, [getInternship ,id]);


  return loading || internship === null ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        
          
        <EditInternshipForm internshipId ={internship._id} internship={internship}/>
       
       </div>
      </div>
      </div>
    </Fragment>
  )
}

Internship.propTypes ={
  internship: PropTypes.object.isRequired,
  getInternship: PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
  internship: state.internship
 });
 export default connect(mapStateToProps, {getInternship})(Internship)
