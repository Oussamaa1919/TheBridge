import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrainings ,deleteTraining } from '../../actions/training';
import formatDate from '../../utils/formatDate';
import { Link } from 'react-router-dom';

const Trainings = ({getTrainings, deleteTraining,training:{trainings}}) => {
  
  useEffect(() => {
    getTrainings();
  },[getTrainings])
  
  const traininglist = trainings.map((training) => (
    <tr key={training._id}>
      <td className='td-1'>{training.title}</td>
      <td className='td-2'>{training.location}</td>
      <td className='td-3'>{formatDate(training.date)}</td>
      <td className='td-4'>{training.coach}</td>
      <td className='td-5'>{training.periode}</td>
      <td className='td-6'>{training.status}</td>
      <td ><button className='btn'  type="button"> 
        Update
        </button></td>
      <td ><button className='btn' onClick={()=>deleteTraining(training._id)} type="button"> 
        Delete
        </button></td>

    </tr>
  ))
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        <table className="table">
        <div className='Header'>
        <h2>Trainings</h2>
        <button className='btn btn-inscription'>Inscription list</button>
        <Link to='/trainingform'>
        <button className='btn'>Add Training</button>
        </Link>
        </div>
        <thead>
          <tr className='cardHeader'>
            <th >Title</th>
            <th >Location</th>
            <th >Date</th>
            <th >Coach</th>
            <th >Periode</th>
            <th >Status</th>
            <th >Update</th>
            <th >Delete</th>
            <th />
          </tr>
        </thead>
        <tbody>{traininglist}</tbody>
      </table>
        </div>
      </div>
    </div>
    </Fragment>
  )
}
  Trainings.propTypes ={
   getTrainings: PropTypes.func.isRequired,
   deleteTraining :PropTypes.func.isRequired,
   training: PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    training: state.training
  });
export default connect(mapStateToProps, { getTrainings,deleteTraining }) (Trainings)
