

import React, { useEffect,useState} from 'react'
import RightSideBar from '../layout/RightSideBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApplications,deleteApplication } from '../../actions/internship';
import {  useParams} from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import formatDate from '../../utils/formatDate';

const AppliedInternships = ({getApplications,deleteApplication, internship:{internships},}) => {

  const { id } = useParams();

  useEffect(() => {
    getApplications(id);
  },[getApplications,id])


  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= internships.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}

  return (
    <div className='apllied-body'>
      <RightSideBar />
    <div className='container-table2 '>

    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
   Apllications:
  </h1>
  
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Title</th>
          <th className='userBirth'>Date</th>
          <th className='userPhone'>Location</th>
          <th className='userAddress'>Periode</th>
          <th className='userAddress'>Type</th>
          <th className='userAction'>Delete</th>
      </tr>
      {
  internships.length > 0 ? internships.slice(page * 5 - 5, page * 5).map((internship, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{internship.title}</td>
      <td className='userBirth f-weight'>{formatDate(internship.date)}</td>
      <td className='userPhone f-weight'>{internship.location}</td>
      <td className='userAddress f-weight'>{internship.periode}</td>
      <td className='userAddress f-weight'>{internship.type}</td>
      
      <td className='contact' ><button 
      
      
      
      className='contactCTA'onClick={() => deleteApplication(internship._id,internship.inscriptions.find(
        inscription => inscription.user === id
      )._id)} >Delete</button></td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any applictaions yet.</td>
    </tr>
}
      </tbody>
  </table>

  

  {/* JSX PArt */}
  {
      internships.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(internships.length / 5))].map((n, i) => {
                      return <div  
                      className={`num ${page === i + 1 ? `numActive` : ''}`} 
                      onClick={() => selectPageHandle(i + 1)} >{i + 1}</div>
                  })
              }
          </div>
          <div className='arrows' onClick={() => selectPageHandle(page + 1)}>
              <MdKeyboardArrowRight size={25} />
          </div>
      </div>
  }
</div>
</div>
</div>
</div>
)
}

AppliedInternships.propTypes ={
  getApplications: PropTypes.func.isRequired,
  deleteApplication:PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   internship: state.internship
 });
export default connect(mapStateToProps, { getApplications,deleteApplication }) (AppliedInternships)
