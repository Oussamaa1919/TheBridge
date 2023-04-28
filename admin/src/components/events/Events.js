import React, {Fragment, useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvents ,deleteEvent} from '../../actions/events';
import { Link,useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import formatDate from '../../utils/formatDate';

const Events = ({getEvents,deleteEvent, events:{events}}) => { 

  useEffect(() => {
    getEvents();
  },[getEvents])
  const navigate = useNavigate();

  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= events.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}




  return (
  
  <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Events:
  </h1>
  <Link to='/eventform'>
  <button className='btn'  type="button">Add Event</button>  
  </Link>
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Title</th>
          <th className='userAddress'>Date</th>
          <th className='userAddress'>Location</th>
          <th className='userAddress'>Inscriptions</th>
          
          <th className='userAction'>Update</th>
          <th className='userAction'>Delete</th>
      </tr>
      {
  events.length > 0 ? events.slice(page * 5 - 5, page * 5).map((event, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{event.title}</td>
      <td className='userAddress f-weight'>{formatDate(event.date)}</td>
      <td className='userAddress f-weight'>{event.location}</td>
      <td className='contact'><Link  to={`/participation/${event._id}`}><button className='contactCTA'>Inscriptions</button></Link></td>
      <td className='contact'><Link  to={`/updateform/${event._id}`}><button className='contactCTA'>Update</button></Link></td>
      <td className='contact' ><button className='contactCTA DeleteALL ' onClick={()=>deleteEvent(event._id)}>Delete</button></td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any events yet.</td>
    </tr>
}
      </tbody>
  </table>

  

  {/* JSX PArt */}
  {
      events.length > 0 && <div className='paginationevents'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(events.length / 5))].map((n, i) => {
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

Events.propTypes ={
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  deleteEvent:PropTypes.func.isRequired,
 }
 const mapStateToProps = (state) => ({
   events: state.events
 });
export default connect(mapStateToProps, { getEvents,deleteEvent }) (Events)
