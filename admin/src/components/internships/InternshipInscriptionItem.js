import React from 'react';
import PropTypes from 'prop-types';


const InternshipInscriptionItem = (
  {
    
    inscription: { _id, name, email, phone,university,location,resume,coverletter },
    
  }
) => {

  const handleDownloadResume = (resumeUrl) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
  
    // Extract file extension from resume filename
    const extension = resumeUrl.split(".").pop();
    const filename = `resume.${extension}`;
  
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

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
      <th>resmue</th>
      <th>coverletter</th>
     </tr>   
     <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td >{university}</td>
      <td>{location}</td>
      
      <td><button
                onClick={() =>
                  handleDownloadResume(
                    `http://localhost:5000/uploads/${resume}`
                  )
                }
              >
                Download Resume
              </button> </td>
     </tr>
     </tbody>
     </table>
  </div>
  
  
  )
}
InternshipInscriptionItem.propTypes = {
  inscription: PropTypes.object.isRequired,
  
};

export default InternshipInscriptionItem