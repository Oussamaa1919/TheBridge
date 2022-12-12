import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import explogo from '../../img/expicon.png'
import del from '../../img/delete-icon.png'
import plus from '../../img/plus.png'


const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
      <div key={exp._id} className='profile-desc-row'>
        <div>
      <img src={explogo} alt='' className='exp-img'  />
      <div>
      <h3>{exp.title}</h3>
      <img src={del}alt='' onClick={() => deleteExperience(exp._id)}  className='exp-del'/>
      <b>{exp.company}</b>
      <b>{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}</b>
      <p>{exp.description}</p>
      
      
        
        </div>
          </div>
              </div>
  ));

  return (
    <Fragment>
      <div className='profile-description'>
      <h2 className="my-2">Experience Credentials</h2>
      <Link to='/add-experience' >
      <img src={plus} alt='' className='plus-img'/> 
      </Link>
      
      <div> 
      {experiences}
      
      </div>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
