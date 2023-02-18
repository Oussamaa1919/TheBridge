import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTraining } from '../../actions/training';






const TrainingItem = ({
  deleteTraining,
    training: {_id,title,description,price,location,periode,coach,status,inscriptions  } }) => (




  <div className='training-container'>
  
  <table>
    <tbody>
  
   
   </tbody>
   <tr>
    <td>{title}</td>
    <td>{coach}</td>
    <td>{location}</td>
    <td>{status}</td>
    <td>{price}</td>
    <td><button className='btn' onClick={()=>deleteTraining(_id)} type="button">Delete</button></td>
    <td>Update</td>
    <td><Link to={`/trainings/${_id}`}>Inscriptions</Link></td>


   </tr>
   </table>
</div>

)


  
  
  


TrainingItem.propTypes ={
 training: PropTypes.object.isRequired,
 deleteTraining :PropTypes.func.isRequired,
 
}


export default connect(null,{deleteTraining})(TrainingItem)
