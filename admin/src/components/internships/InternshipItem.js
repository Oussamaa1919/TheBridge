import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteInternship } from '../../actions/internships';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';



const InternshipItem = ({deleteInternship,
  internship:{_id,title,description,type,location,company,periode,technologies,requirements,date}}) => {
    return (
      <div className='cardbody'>
        <div id="cardcontainer">	
    
    <div className="product-details">
      
    <h1>{title}</h1>
    <h2>{company}</h2>
      
        <p className="information">{description}</p>
  
        <div className="control">
    
    <button className="btn-card" >
    <Link to={`/internships/${_id}`}>
     <span className="buy" >Update</span>
     </Link>
   </button>
   <button className="btn-card"  onClick={()=>deleteInternship(_id)} type="button">
     <span className="buy" >Delete</span>
     
   </button>
   <button className="btn-card">
     <Link to={`/inscriptions/${_id}`}>
     <span className="buy" >Inscriptions</span>
     </Link>
   </button>
   
  
    
  </div>
        
  </div>
    
  <div className="product-image">
    
    
  
  <div className="info">
    <h2> Description</h2>
    <ul>
      <li><strong>Location : </strong>{location}</li>
      <li><strong>Periode : </strong>{periode}</li>
      <li><strong>Date: </strong>{formatDate(date)}</li>
      <li><strong>Type : </strong>{type}</li>

      <li><strong>Technologies: </strong>{technologies}</li>
      <li><strong>Requirments: </strong>{requirements}</li>
      
    </ul>
  </div>
  </div>
   
  </div>
      </div>
    )
  }

  InternshipItem.propTypes ={
    internship: PropTypes.object.isRequired,
    deleteInternship: PropTypes.func.isRequired,
   }
  
  
   export default connect(null,{deleteInternship})(InternshipItem)
