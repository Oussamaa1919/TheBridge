import React from 'react';
import PropTypes from 'prop-types';
const InscriptionItem = (
  {
    
    inscription: { _id, name, email, phone,university,location,option,paid },
    
  }
) => {
  return (
    <div className='training-container'>
  
    <table>
      <tbody>
    
     
     </tbody>
     <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td >{university}</td>
      <td>{location}</td>
      <td>{option}</td>
      <td>{paid}</td>
  
  
     </tr>
     </table>
  </div>
  
  )
}
InscriptionItem.propTypes = {
  trainingId: PropTypes.string.isRequired,
  inscription: PropTypes.object.isRequired,
  
};

export default InscriptionItem
