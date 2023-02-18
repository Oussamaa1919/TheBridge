import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteTraining } from '../../actions/training';
import { connect } from 'react-redux';

const TrainingItem = ({
  deleteTraining,
  training:{_id,title,description,price,location,date,status,coach,periode}}) => {
  
  
    return (
    <div className='cardbody'>
      <div id="cardcontainer">	
	
	<div className="product-details">
		
	<h1>{title}</h1>
	
		
			<p className="information">{description}</p>

      <div className="control">
	
	<button className="btn-card" >
	<Link to={`/trainings/${_id}`}>
	 <span className="buy" >Update</span>
	 </Link>
 </button>
 <button className="btn-card"  onClick={()=>deleteTraining(_id)} type="button">
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
		<li><strong>Coach: </strong>{coach}</li>
		<li><strong>Achievement Certificate: </strong>YES!!!</li>
		
	</ul>
</div>
</div>
 
</div>
    </div>
  )
}

TrainingItem.propTypes ={
	training: PropTypes.object.isRequired,
  deleteTraining: PropTypes.func.isRequired,
 }


 export default connect(null,{deleteTraining})(TrainingItem)
