import React from 'react'
import android from '../../img/android4.jpg'
const TrainingItem = () => {
  return (
    <div className='cardbody'>
      <div id="cardcontainer">	
	
	<div className="product-details">
		
	<h1>Create apps for Android</h1>
	<span className="hint-star star">
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
		<i className="fa fa-star" aria-hidden="true"></i>
	</span>
		
			<p className="information">" Android is the most popular operating system on smartphones and tablets. The applications being written in Java, you.</p>

      <div className="control">
	
	<button className="btn-card">
	 <span className="price">600DT</span>
   <span className="shopping-cart"><i class="fas fa fa-solid fa-money-check"></i></span>
   <span className="buy">Let's go</span>
   
 </button>
		

	
</div>
			
</div>
	
<div className="product-image">
	
	<img src={android} alt="" />
	

<div className="info">
	<h2> Description</h2>
	<ul>
		<li><strong>Location : </strong>Level 1 </li>
		<li><strong>Periode : </strong>2 months</li>
		<li><strong>Coach: </strong>Ahmed Naffeti</li>
		<li><strong>Achievement Certificate: </strong>YES!!!</li>
		
	</ul>
</div>
</div>

</div>
    </div>
  )
}

export default TrainingItem
