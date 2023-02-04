import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getTrainings } from '../../actions/training';
import TrainingItem from './TrainingItem';

const Trainings = ({getTrainings, training:{trainings}}) => {
  
  useEffect(() => {
    getTrainings();
  },[getTrainings])
  
  
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
      
         
          {
          trainings.map((training) => (
            <TrainingItem key={training._id} training={training} />
          ))}
        
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
