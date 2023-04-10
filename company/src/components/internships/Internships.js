import React, {Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyInternships,deleteAllInternship ,deleteInternship } from '../../actions/internship';
import { Link,useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import formatDate from '../../utils/formatDate';

const Internships = ({getMyInternships,deleteAllInternship,deleteInternship,internship:{internships}}) => { 

  useEffect(() => {
    getMyInternships();
  },[getMyInternships])
  const navigate = useNavigate();

  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= internships.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}




  return (
  
  <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Internships:
  </h1>
<button className='DeleteALL ' onClick={()=>deleteAllInternship(navigate)} type="button">Delete All Internships</button>  
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Title</th>
          <th className='userBirth'>Date</th>
          <th className='userPhone'>Location</th>
          <th className='userAddress'>Periode</th>
          <th className='userAddress'>Type</th>
          <th className='contact'>Applications</th>
          <th className='userAction'>Update</th>
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
      <td className='contact'><Link  to={`/internshipinscriptions/${internship._id}`}><button className='contactCTA'>Apllications</button></Link></td>
      <td className='contact'><Link  to={`/updateform/${internship._id}`}><button className='contactCTA'>Update</button></Link></td>
      <td className='contact' ><button className='contactCTA DeleteALL ' onClick={()=>deleteInternship(internship._id)}>Delete</button></td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any internships yet.</td>
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
)
}

Internships.propTypes ={
  getMyInternships: PropTypes.func.isRequired,
  deleteAllInternship:PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   internship: state.internship
 });
export default connect(mapStateToProps, { getMyInternships,deleteAllInternship,deleteInternship }) (Internships)
