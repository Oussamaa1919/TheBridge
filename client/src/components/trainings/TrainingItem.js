import React from 'react'
import android from '../../img/azaz.jpeg'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';


const TrainingItem = ({training:{_id,title,description,price,location,date,status,coach,periode}}) => {
  return (
    <div className='cardbody'>
      <div id="cardcontainer">	
	
	<div className="product-details">
		
	<h1>{title}</h1>
	<span className="hint-star star">
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
	</span>
		
			<p className="information">{description}</p>

      <div className="control">
	
	<button className="btn-card">
	 <span className="price">{price}</span>
   <span className="shopping-cart"><i className="fas fa fa-solid fa-money-check"></i></span>
   <Link to={`/trainings/${_id}`}>
	 <span className="buy" >Let's go</span>
	 </Link>
 </button>
 

	
</div>
			
</div>
	
<div className="product-image">
	
	<img src={android} alt="" />
	

<div className="info">
	<h2> Description</h2>
	<ul>
		<li><strong>Location : </strong>{location}</li>
		<li><strong>Periode : </strong>{periode}</li>
		<li><strong>Coach: </strong>{coach}</li>
		<li><strong>Coach: </strong>{formatDate(date)}</li>
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
 }


export default TrainingItem
