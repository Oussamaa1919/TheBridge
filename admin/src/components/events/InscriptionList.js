import React, {  useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/events';
import { Link, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
const InscriptionList = ({ getEvent, events:{event}}) => {
  const { id } = useParams();
  useEffect(() => {
    getEvent(id);
  }, [getEvent ,id]);

  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= event && event.inscriptions.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}


  return (
    <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Inscriptions:
  </h1>
  <Link to='/events'>
  <button className='btn'  type="button">Events</button>  
  </Link>
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>name</th>
          <th className='userAddress'>email</th>
          
      </tr>
      {
  event && event.inscriptions.length > 0 ? event && event.inscriptions.slice(page * 5 - 5, page * 5).map((inscription, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{inscription.name}</td>
      <td className='userBirth f-weight'>{inscription.email}</td>
     
     

    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any inscriptions for this event yet.</td>
    </tr>
}
      </tbody>
  </table>


  {/* JSX PArt */}
  {
      event && event.inscriptions.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(event && event.inscriptions.length / 5))].map((n, i) => {
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

InscriptionList.propTypes = {
  getInternship: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, { getEvent })(InscriptionList);