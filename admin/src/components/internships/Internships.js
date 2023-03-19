import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInternships  } from '../../actions/internships';
import { Link } from 'react-router-dom';
import InternshipItem from './InternshipItem'

const Internships = ({getInternships,internship:{internships}}) => {


  useEffect(() => {
    getInternships();
  },[getInternships])



  return (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
      <div className='table'>
          <div className='Header'>
        <h2>Internships</h2>
        <Link to='/internshipform'>
        <button className='btn'>Add Internship</button>
        </Link>
        </div>
        <div >
      
        {
          internships.map((internship) => (
                      <InternshipItem key={internship._id} internship={internship}/>
          ))
        }
        </div>
        </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
  
}

Internships.propTypes ={
  getInternships: PropTypes.func.isRequired,

  internship: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   internship: state.internship
 });
export default connect(mapStateToProps, { getInternships }) (Internships)
