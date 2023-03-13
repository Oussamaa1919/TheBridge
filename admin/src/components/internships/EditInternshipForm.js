import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateInternship } from '../../actions/internships';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditInternshipForm = ({ updateInternship,internship:{internship}}) => {
  
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: internship.title,
    description: internship.description,
    type: internship.type,
    location: internship.location,
    periode: internship.periode,
    company: internship.company,
    technologies: internship.technologies,
    requirements: internship.requirements,
    date: internship.date});
    const {title,description,type,location,periode,company, technologies,requirements,date} = formData;
 const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
 return (
    <div className='container-trainings'>
    <div className='main'>
    <div className="details">
      
      <div className="table">
        <div className="Header">
          <h2>Update an Internship</h2>
          <small>* = required field</small>
        </div>
        <div className="internship">
        <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        updateInternship(internship._id,formData, navigate);
      }}
          >
            <div className='form-group'>
         
         <input type="text"
          placeholder="* Title"
          name="title"
          value={title}
          onChange={onChange}
          required
          />
        </div>

        <div className='form-group'>
         
         <input type="text"
          placeholder="* Company"
          name="company"
          value={company}
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
          placeholder="* Type"
          name="type"
          value={type}
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
         placeholder="* Technologies"
         name="technologies"
          value={technologies}
          onChange={onChange}
          required
         />
      </div>
       
      <div className='form-group'>
         <input
          type="text"
         placeholder="* Requirments"
         name="requirements"
          value={requirements}
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
       <input type="submit" className="internshipBtn" value="UPDATE INTERNSHIP" />
      
     </form>
     </div>
   </div>
   </div>
 
</div>
</div>
)
}

EditInternshipForm.propTypes ={
  internship: PropTypes.object.isRequired,
  
  updateInternship:PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
  internship: state.internship
 });
 export default connect(mapStateToProps, {updateInternship})(EditInternshipForm)
