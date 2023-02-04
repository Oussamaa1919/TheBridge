import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import TrainingItem from './TrainingItem';
import Spinner from '../layout/Spinner';



const Training = ({getTraining, training:{training, loading}}) => {
  
  useEffect(() => {
    getTraining();
  }, [getTraining]);
  
  
  return loading || training === null ? (
    <Spinner />
  ) : (
    
    <div >
      
      <TrainingItem training={training}/>
    
    </div>
    
  )
}

TrainingItem.propTypes ={
 training: PropTypes.object.isRequired,
 getTraining: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  training: state.training
});
export default connect(mapStateToProps, {getTraining})(Training)
