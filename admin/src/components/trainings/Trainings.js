import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrainings  } from '../../actions/training';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import TrainingItem from './TrainingItem';

const Trainings = ({getTrainings,training:{trainings}}) => {
  
  useEffect(() => {
    getTrainings();
  },[getTrainings])
  
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
      <div className='table'>
          <div className='Header'>
        <h2>Trainings</h2>
        <Link to='/trainingform'>
        <button className='btn'>Add Training</button>
        </Link>
        </div>
        <div >
      
        {
          trainings.map((training) => (
                      <TrainingItem key={training._id} training={training}/>
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
  Trainings.propTypes ={
   getTrainings: PropTypes.func.isRequired,

   training: PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    training: state.training
  });
export default connect(mapStateToProps, { getTrainings }) (Trainings)
