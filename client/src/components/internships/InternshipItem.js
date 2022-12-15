import React from 'react'
import { Link } from 'react-router-dom';
import intershipphoto from '../../img/internship-img.jpeg'


const InternshipItem = () => {
  return (
    <div className='cardinternshipbody'>
      <div id="cardinternshipcontainer">	
	
	<div className="product-details">
		
	<h1>Web Development (MERN Stack)</h1>
	
		
			<p className="information">" About The project:
The business management and training company headquartered in Bremen, Germany. We are a success-driven firm that provides management advisory and contracting services customized to help companies from different industries with business management problems. </p>

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
		<li><strong>Location : </strong>BeeCoders Ghazzela</li>
		<li><strong>Periode : </strong>6 months</li>
		<li><strong>Technologies: </strong>React,Express,Node,MongoDB,JS</li>
		<li><strong>Type: </strong>Remote </li>
    <li><strong>Requirements : </strong> Bac +3/5 Looking for an end of studies internship </li>
	</ul>
</div>
</div>

</div>
    </div>
  )
}

export default InternshipItem
