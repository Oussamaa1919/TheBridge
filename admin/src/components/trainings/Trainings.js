import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrainings } from '../../actions/training';
import formatDate from '../../utils/formatDate';

const Trainings = ({getTrainings, training:{trainings}}) => {
  
  useEffect(() => {
    getTrainings();
  },[getTrainings])
  
  const traininglist = trainings.map((training) => (
    <tr key={training._id}>
      <td>{training.title}</td>
      <td>{training.location}</td>
      <td>{formatDate(training.date)}</td>
      <td>{training.coach}</td>
      <td>{training.periode}</td>
      <td>{training.status}</td>
      <td>Update</td>
      <td>Delete</td>

    </tr>
  ))
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
      <div className='main'>
        <div className='details'>
        <table className="table">
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
   training: PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    training: state.training
  });
export default connect(mapStateToProps, { getTrainings }) (Trainings)
