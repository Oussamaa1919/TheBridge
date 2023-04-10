import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { updateInternship,getInternship } from '../../actions/internship';
import { useNavigate,useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
const UpdateForm = ({ getInternship,updateInternship, internship:{internship}}) => {
  
  const { id } = useParams();
  useEffect(() => {
    getInternship(id);
  }, [getInternship ,id]);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: internship && internship.title,
    description: internship && internship.description,
    type: internship && internship.type,
    location: internship && internship.location,
    periode: internship && internship.periode,
    companyname: internship && internship.companyname,
    technologies: internship && internship.technologies,
    requirements: internship && internship.requirements,
    date: internship && internship.date});
    const {title,description,type,location,periode,companyname, technologies,requirements,date} = formData;
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
        updateInternship(internship && internship._id,formData, navigate);
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
          name="companyname"
          value={companyname}
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

UpdateForm.propTypes ={
  internship: PropTypes.object.isRequired,
  getInternship:PropTypes.func.isRequired,
  updateInternship:PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
  internship: state.internship
 });
 export default connect(mapStateToProps, {updateInternship,getInternship})(UpdateForm)
