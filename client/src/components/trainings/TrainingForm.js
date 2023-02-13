import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addInscription } from '../../actions/inscription';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const TrainingForm = ({addInscription,auth:{user}}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    
    phone: '',
    university: '',
    location: '',
    type: '',
    option:'',
    
  });
  const {phone,university,location,type,option} = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
 
 
 
 
 
  return (
    <section className='container'>
      <h1 className='large text-primary'>Let's get some information</h1>
      <small>* = required field</small>
      <form className='form'
      onSubmit={(e)=> {
        e.preventDefault();
        addInscription(formData, navigate);
      }}
      >
      <div className="form-group">
          <input
            type="text"
            placeholder="* Name & LastName"
            name="name"
            value={user && user.name}
            
            required           
          /> 
    </div>
          <div className="form-group">
          <input
            type="text"
            placeholder="* Email"
            name="email"
            value={user && user.email}
            required           
          />                   
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* Phone"
            name="phone"
            value={phone}
            onChange={onChange}
            required          
          />                   
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="* University"
            name="university"
            value={university}
            onChange={onChange}
            required             
          />                   
        </div>


        <div className="form-group">
          <input
            type="text"
            placeholder="* Location"
            name="location"    
            value={location}
            onChange={onChange}
            required         
          />                   
        </div>

        <div className="form-group">
          <select name="type"  value={type}
            onChange={onChange}
            required  >
            <option>* Select a Training</option>
            <option value="Web Full stack JS (Node React)">Web Full stack JS (Node React)</option>
            <option value="Web Full stack(Spring Boot Angular)">Web Full stack(Spring Boot Angular)</option>
            <option value="Mobile Flutter">Mobile Flutter</option>
            
          </select>
        </div>

        <div className="form-group">
          <select name="option" value={option}
            onChange={onChange}
            required   >
            <option>* Select an option</option>
            <option value="Remote">Remote</option>
            <option value="Face To Face">Face To Face</option>
            
          </select>
        </div>

        <input type="submit" className="btn btn-primary my-1" value="INSCRIPTION"/>  
        <Link className="btn btn-primary my-1" to="/trainings">
          Go Back
        </Link>


      </form>
    </section>
  )
}

TrainingForm.propTypes = {
  addInscription: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  
});


export default connect(mapStateToProps, {addInscription})(TrainingForm)
