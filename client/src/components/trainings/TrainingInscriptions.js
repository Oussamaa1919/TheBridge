

import React, {useEffect,useState} from 'react'
import RightSideBar from '../layout/RightSideBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInscriptions,deleteInscription } from '../../actions/training';
import { useParams} from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import formatDate from '../../utils/formatDate';

const TrainingInscriptions = ({getInscriptions,deleteInscription, training:{trainings}}) => {

  const { id } = useParams();

  useEffect(() => {
    getInscriptions(id);
  },[getInscriptions,id])


  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= trainings.length / 1 &&
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
   Inscriptions:
  </h1>
  
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Title</th>
          <th className='userBirth'>Date</th>
          <th className='userPhone'>Location</th>
          <th className='userAddress'>Periode</th>
          <th className='userAddress'>Price</th>
          <th className='userAddress'>Coach</th>
          <th className='userAction'>Delete</th>
      </tr>
      {
  trainings.length > 0 ? trainings.slice(page * 5 - 5, page * 5).map((training, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{training.title}</td>
      <td className='userBirth f-weight'>{formatDate(training.date)}</td>
      <td className='userPhone f-weight'>{training.location}</td>
      <td className='userAddress f-weight'>{training.periode}</td>
      <td className='userAddress f-weight'>{training.price}</td>
      <td className='userAddress f-weight'>{training.coach}</td>
      
      <td className='contact' ><button 
      
      
      
      className='contactCTA'onClick={() => deleteInscription(training._id,training.inscriptions.find(
        inscription => inscription.user === id
      )._id)} >Delete</button></td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any inscriptions yet.</td>
    </tr>
}
      </tbody>
  </table>

  

  {/* JSX PArt */}
  {
      trainings.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(trainings.length / 5))].map((n, i) => {
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

TrainingInscriptions.propTypes ={
  getInscriptions: PropTypes.func.isRequired,
  deleteInscription: PropTypes.func.isRequired,
  training: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   training: state.training
 });
export default connect(mapStateToProps, { getInscriptions,deleteInscription }) (TrainingInscriptions)
