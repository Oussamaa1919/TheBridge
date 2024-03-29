import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTraining } from '../../actions/training';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditTrainingForm = ({ updateTraining,training:{training}}) => {
 
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: training.title,
    description: training.description,
    price: training.price,
    location: training.location,
    periode: training.periode,
    coach: training.coach,
    date: training.date,
    status:'comming soon'});
    const {title,description,price,location,periode,coach,date,status} = formData;
 const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  return (
    <div className='container-trainings'>
    <div className='main'>
    <div className="details">
      
      <div className="table">
        <div className="Header">
          <h2>Update a Training</h2>
          <small>* = required field</small>
        </div>
        <div className="internship">
        <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        updateTraining(training._id,formData, navigate);
      }}
          >
            <div className='form-group'>
            
            <input type="text"
             placeholder="* Title"
             name="title"
             Value={title}
             onChange={onChange}
             required
             />
           </div>
           <div className='form-group'>
            <input 
             type="text"
             placeholder="* Description"
             name="description"
             

             value={description}

             onChange={onChange}
             required
             />
          </div>
          <div className='form-group'>
            <input 
             type="text"
             placeholder="* Price"
             name="price"

             value={price}
             onChange={onChange}
             required
             />
          
          </div>
          <div className='form-group'>
            <input 
            type="text" 
            placeholder="* Location"
            name="location"

             value={location}
             onChange={onChange}
             required
            />
         </div>
         <div className='form-group'> 
            <input
              type="text"
              placeholder="* Periode"
              name="periode"
             value={periode}
             onChange={onChange}
             required
              />
              </div>
              <div className='form-group'>
            <input
             type="text"
            placeholder="* Coach"
            name="coach"
             value={coach}
             onChange={onChange}
             required
            />
         </div>
          
         <div className='form-group'> 
            <input
             type="date"
              placeholder="* Date"
              name="date"
             value={date}
             onChange={onChange}
             required
              />
          </div>
          <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>*  {status}</option>
            <option value="Comming soon">Comming soon</option>
            <option value="In progress">In progress</option>
            <option value="Finished">Finished</option>
          </select>
          
        
          </div>
          <input type="submit" className="internshipBtn" value="Update TRAINING" />
         
        </form>
        </div>
      </div>
      </div>
    
  </div>
  </div>
  )
}

EditTrainingForm.propTypes ={
  training: PropTypes.object.isRequired,
  
  updateTraining:PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
   training: state.training
 });
 export default connect(mapStateToProps, {updateTraining})(EditTrainingForm)

