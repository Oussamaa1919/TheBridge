import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
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
    caoch: training.coach,
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
          <h2>Add An Internship</h2>
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
             defaultValue={training && training.description}

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
             defaultValue={training && training.price}

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
            defaultValue={ training && training.location}

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
          <div className='form-group'> 
            <input
             type="text"
              placeholder="* Status"
              name="status"
             value={status}
             onChange={onChange}
             required
              />
          </div>
          <input type="submit" className="internshipBtn" value="ADD TRAINING" />
         
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
  getTraining: PropTypes.func.isRequired,
  updateTraining:PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
   training: state.training
 });
 export default connect(mapStateToProps, {getTraining,updateTraining})(EditTrainingForm)

