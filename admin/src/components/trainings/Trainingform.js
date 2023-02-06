import React ,{ useState }from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTraining } from '../../actions/training';





const Trainingform = ({addTraining}) => {
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    periode: '',
    caoch: '',
    date: '',
    status:'comming soon'

  });
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
          addTraining(formData, navigate);
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

Trainingform.propTypes = {
  addTraining: PropTypes.func.isRequired,
}


export default connect(null, {addTraining})(Trainingform)
