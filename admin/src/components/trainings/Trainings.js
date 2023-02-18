import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrainings ,deleteTraining } from '../../actions/training';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import TrainingItem from './TrainingItem';

const Trainings = ({getTrainings, deleteTraining,training:{trainings}}) => {
  
  useEffect(() => {
    getTrainings();
  },[getTrainings])
  
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        <table className="table">
          <div className='Header'>
        <h2>Trainings</h2>
        <Link to='/trainingform'>
        <button className='btn'>Add Training</button>
        </Link>
        </div>
        <div >
        <table className='head'>
       
    <thead> 
      <tr className='cardHeader'>
        <td>Title</td>
        <td>Coach</td>
        <td>Location</td>
        <td>Status</td>
        <td>Price</td>
        <td>Delete</td>
        <td>Update</td>
        <td>Inscriptions</td>

      </tr>
    </thead>
    </table>
        {
          trainings.map((training) => (
                      <TrainingItem key={training._id} training={training}/>
          ))
        }
        </div>
      </table>
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
