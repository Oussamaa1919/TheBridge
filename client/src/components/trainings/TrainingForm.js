import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addInscription } from '../../actions/training';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const TrainingForm = ({trainingId,addInscription,auth:{user}}) => {
 
 
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    
    phone: '',
    university: '',
    location: '',  
    option:'',
    
    
  });
  const {phone,university,location,option} = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
    console.log(trainingId);

 
 
 
  return (
    <section className='container'>
      <h1 className='large text-primary'>Let's get some information</h1>
     
      <form className='form'
      onSubmit={(e)=> {
        e.preventDefault();
        addInscription(trainingId,formData, navigate);
      }}
      >
      <div className="form-group">
          <input
            type="text"
            placeholder="* Name & LastName"
            name="name"
            defaultValue={user && user.name}
            
            required           
          /> 
    </div>
          <div className="form-group">
          <input
            type="text"
            placeholder="* Email"
            name="email"
            defaultValue={user && user.email}
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
