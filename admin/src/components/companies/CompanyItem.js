import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteTraining } from '../../actions/training';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';

const CompanyItem = ({
  
  profile:{
    company: { _id, name, email },
    
    description,phone,location,website}}) => {
  
  
    return (
    <div className='cardbody'>
      <div id="cardcontainer">	
	
	<div className="product-details">
		
	<h1>{name}</h1>
	
		
			<p className="information">{description}</p>

      <div className="control">
	
	
 
 <button className="btn-card">
   
	 <span className="buy" >Verify</span>
	
 </button>
 

	
</div>
			
</div>
	
<div className="product-image">
	
	

<div className="info">
	<h2> Description</h2>
	<ul>
		<li><strong>Location : </strong>{location}</li>
		<li><strong>Phone : </strong>{phone}</li>
		<li><strong>Email: </strong>{email}</li>
    <li><strong>Web Site: </strong>{website}</li>
		

		
	</ul>
</div>
</div>
 
</div>
    </div>
  )
}

CompanyItem.propTypes ={
	profile: PropTypes.object.isRequired,
 
 }


 export default connect(null)(CompanyItem)
