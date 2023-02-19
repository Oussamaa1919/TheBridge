import React from 'react';
import PropTypes from 'prop-types';
const InscriptionItem = (
  {
    
    inscription: { _id, name, email, phone,university,location,option,paid },
    
  }
) => {
  return (
    <div className='training-container'>
      
        <table className='tableinscription'>
      <tbody>  
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th >University</th>
      <th>Location</th>
      <th>Option</th>
      <th>Paid</th>
     </tr>   
     <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td >{university}</td>
      <td>{location}</td>
      <td>{option}</td>
      <td>{paid}</td>
     </tr>
     </tbody>
     </table>
  </div>
  
  
  )
}
InscriptionItem.propTypes = {
  inscription: PropTypes.object.isRequired,
  
};

export default InscriptionItem