import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';






const TrainingItem = ({
  training:{title,location,date,status,coach,periode}

}) => (
  
    <div >
      
      {title},{location},{formatDate(date)},{status},{coach},{periode}
    
    </div>
   ) 
  


TrainingItem.propTypes ={
 training: PropTypes.object.isRequired,
}


export default TrainingItem
