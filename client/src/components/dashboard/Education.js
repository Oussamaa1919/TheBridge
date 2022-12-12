import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import explogo from '../../img/eduicon.png'
import del from '../../img/delete-icon.png'
import plus from '../../img/plus.png'

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div key={edu._id} className='profile-desc-row'>
    <div>
  <img src={explogo} alt='' className='exp-img'  />
  <div>
  <h3>{edu.degree}</h3>
  <img src={del}alt='' onClick={() => deleteEducation(edu._id)}  className='exp-del'/>
  <b>{edu.school}</b>
  <b>{edu.fieldofstudy}</b>
  <b>{formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}</b>
  <p>{edu.description}</p>
  
  
    
    </div>
      </div>
          </div>
  ));

  return (
    <Fragment>
      <div className='profile-description'>
      <h2 className="my-2">Education Credentials</h2>
      <Link to='/add-education' >
      <img src={plus} alt='' className='plus-img'/> 
      </Link>
      
      <div> 
      {educations}
      
      </div>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
