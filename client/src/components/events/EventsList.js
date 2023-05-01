

import React, { useEffect,useState} from 'react'
import RightSideBar from '../layout/RightSideBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventsList,deleteParticipation } from '../../actions/event';
import {  useParams} from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import formatDate from '../../utils/formatDate';

const EventsList = ({getEventsList,deleteParticipation, event:{events},}) => {

  const { id } = useParams();

  useEffect(() => {
    getEventsList(id);
  },[getEventsList,id])


  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= events.length / 1 &&
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
   Comming Events:
  </h1>
  
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Title</th>
          <th className='userAddress'>Date</th>
          <th className='userAddress'>Location</th>
          
          <th className='userAction'>Delete</th>
      </tr>
      {
  events.length > 0 ? events.slice(page * 5 - 5, page * 5).map((event, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{event.title}</td>
      <td className='userAddress f-weight'>{formatDate(event.date)}</td>
      <td className='userAddress f-weight'>{event.location}</td>
    
      
      <td className='contact' ><button 
      
      
      
      className='contactCTA'onClick={() => deleteParticipation(event._id,event.inscriptions.find(
        inscription => inscription.user === id
      )._id)} >Delete</button></td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any events yet.</td>
    </tr>
}
      </tbody>
  </table>

  

  {/* JSX PArt */}
  {
      events.length > 0 && <div className='paginationevent'>
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
</div>
)
}

EventsList.propTypes ={
  getEventsList: PropTypes.func.isRequired,
  deleteParticipation:PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
  event: state.event
 });
export default connect(mapStateToProps, { getEventsList,deleteParticipation }) (EventsList)
