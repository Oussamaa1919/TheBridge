import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {  useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import TrainingItem from './TrainingItem';
import Spinner from '../layout/Spinner';
import TrainingForm from './TrainingForm';



const Training = ({getTraining, training:{training, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getTraining(id);
  }, [getTraining, id]);
  
  return loading || training === null ? (
    <Spinner />
  ) : (
    
    <div >
      
      <TrainingForm  trainingId={training._id} training={training}/>
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
