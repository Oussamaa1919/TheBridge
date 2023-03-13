import React from 'react'
import { Link } from 'react-router-dom';
import intershipphoto from '../../img/internship-img.jpeg'


const InternshipItem = ({internship:{_id,title,description,type,location,date,requirments,technologies,periode}}) => {
  return (
    <div className='cardinternshipbody'>
      <div id="cardinternshipcontainer">	
	
	<div className="product-details">
		
	<h1>{title}</h1>
	
		
			<p className="information">{description} </p>

      <div className="control">
	
	<button className="btn-card">
	 <span className="price">Apply</span>
   <span className="shopping-cart"><i class="fas fa fa-solid fa-paper-plane"></i></span>
   <Link to='/internship-form'>
	 <span className="buy">Now !!!</span>
	 </Link>
 </button>
 

	
</div>
			
</div>
	
<div className="product-image">
	
	<img src={intershipphoto} alt="" />
	

<div className="info">
	<h2> Description</h2>
	<ul>
		<li><strong>Location : </strong>{location}</li>
		<li><strong>Periode : </strong>{periode}</li>
		<li><strong>Technologies: </strong>{technologies}</li>
		<li><strong>Type: </strong>{type} </li>
    <li><strong>Requirements : </strong>{technologies} </li>
	</ul>
</div>
</div>

</div>
    </div>
  )
}

export default InternshipItem
