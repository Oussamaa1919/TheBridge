import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import TrainingItem from './TrainingItem';
import Spinner from '../layout/Spinner';
import InscriptionItem from './InscriptionItem'
import { useParams } from 'react-router-dom';
import EditTrainingForm from './EditTrainingForm';

const Inscriptions = ({getTraining, training:{training, loading}}) => {
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
        
        
          
        {training.inscriptions.map((inscription) => (
          <InscriptionItem key={inscription._id} inscription={inscription} trainingId={training._id} />
        ))}
       
       </div>
      </div>
      </div>
    </Fragment>
  )
}

Inscriptions.propTypes ={
 training: PropTypes.object.isRequired,
 getTraining: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  training: state.training
});
export default connect(mapStateToProps, {getTraining})(Inscriptions)
