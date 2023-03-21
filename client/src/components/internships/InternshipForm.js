import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addApplication } from '../../actions/internship';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const InternshipForm = ({internship,addApplication,auth:{user}}) => {
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('');
  const [resume, setResume] = useState(null);
  const [coverletter, setCoverLetter] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('university', university);
    formData.append('location', location);
    formData.append('resume', resume);
    formData.append('coverletter', coverletter);
    addApplication(internship._id,formData, navigate);

  };
  


  
  
    return (
      <section className='container'>
        <h1 className='large text-primary'>Let's get some information</h1>
        <small>* = required field</small>
  
        <form className='form'
        onSubmit={onSubmit}
        >
                          
          
        <div className="form-group">
            <input
              type="text"
              placeholder="* Name & LastName"
              name="name"
              defaultValue={user && user.name}
              readOnly
              required           
            /> 
      </div>
            <div className="form-group">
            <input
              type="text"
              placeholder="* Email"
              name="email"
              defaultValue={user && user.email}
              readOnly
              required           
            />                   
          </div>
  
          <div className="form-group">
            <input
              type="text"
              placeholder="* Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required          
            />                   
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="* University"
              name="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required             
            />                   
          </div>
  
  
          <div className="form-group">
            <input
              type="text"
              placeholder="* Location"
              name="location"    
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required         
            />                   
          </div>
          <div className="form-group">
            <input
              type="file"
              placeholder="* resume"
              name="resume"    
              className='custom-file-input-resume'
              onChange={(e) => setResume(e.target.files[0])}
              required         
            />                   
          </div>
          
          
  
          <div className="form-group">
            <input
              type="file"
              placeholder="* coverletter"
              name="coverletter"    
              className='custom-file-input-letter'
              onChange={(e) => setCoverLetter(e.target.files[0])}
              required         
            />                   
          </div>
  
          <input type="submit" className="btn btn-primary my-1" value="Send application"/>  
          <Link className="btn btn-primary my-1" to="/internships">
            Go Back
          </Link>
  
  
        </form>
      </section>
    )
  }

InternshipForm.propTypes = {
  addApplication: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  
});


export default connect(mapStateToProps, {addApplication})(InternshipForm)
