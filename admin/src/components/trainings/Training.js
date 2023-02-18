import React, { useEffect,Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import TrainingItem from './TrainingItem';
import Spinner from '../layout/Spinner';
import InscriptionItem from './InscriptionItem'
import { useParams } from 'react-router-dom';

const Training = ({getTraining, training:{training, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getTraining(id);
  }, [getTraining]);
  
  
  return loading || training === null ? (
    <Spinner />
  ) : (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        <table className="table">
        <div >
        <table className='head2'>
    <thead> 
      <tr className='cardHeader'>
        <td >Name</td>
        <td>Email</td>
        <td className='tdphone'>Phone</td>
        <td>University</td>
        <td>Location</td>
        <td>Type</td>
        <td>Paid</td>

      </tr>
    </thead>
    </table>
   
        {training.inscriptions.map((inscription) => (
          <InscriptionItem key={inscription._id} inscription={inscription} trainingId={training._id} />
        ))}
       
       </div>
      </table>
        </div>
      </div>
    </div>
    </Fragment>
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
