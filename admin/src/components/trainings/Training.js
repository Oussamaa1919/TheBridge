import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router-dom';
import EditTrainingForm from './EditTrainingForm';

const Training = ({getTraining, training:{training, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getTraining(id);
  }, [getTraining ,id]);
  
  
  return loading || training === null ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        
          
        <EditTrainingForm  training={training}/>
       
       </div>
      </div>
      </div>
    </Fragment>
  )
}

Training.propTypes ={
 training: PropTypes.object.isRequired,
 getTraining: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  training: state.training
});
export default connect(mapStateToProps, {getTraining})(Training)
