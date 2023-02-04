import React from 'react';
import PropTypes from 'prop-types';






const TrainingItem = ({
  training:{title,location,status}

}) => (
  
    <div className='main'>
      <div className='details'>
        <div className='table'>
      {title},{location},{status}
    </div>
    </div>
    </div>
   ) 
  


TrainingItem.propTypes ={
 training: PropTypes.object.isRequired,
}


export default TrainingItem
