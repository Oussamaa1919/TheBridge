import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInternship } from '../../actions/internships';
import Spinner from '../layout/Spinner';
import InternshipInscriptionItem from './InternshipInscriptionItem'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const InternshipInscriptions = ({getInternship, internship:{internship, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getInternship(id);
  }, [getInternship ,id]);
  

  
  return loading || internship === null ? (
    <Spinner />
  ) : (
    <Fragment >
            <div className='container-trainings'>
            <div className='main'>
          <div className='detailsinscriptions'>       
          <div className='table'>
          <div className='Header'>
        <h2>{internship.title}:</h2>
        <Link to='/internships'>
        <button className='btn'>Internships</button>
        </Link>
        </div>
        {internship.inscriptions.map((inscription) => (
          <InternshipInscriptionItem key={inscription._id} inscription={inscription}  />
        ))}
        </div>
       </div>
       </div>
       </div>
 

    </Fragment>
  )
}
InternshipInscriptions.propTypes ={
  internship: PropTypes.object.isRequired,
  getInternship: PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
   internship: state.internship
 });

 export default connect(mapStateToProps, {getInternship})(InternshipInscriptions)