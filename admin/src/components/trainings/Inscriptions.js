import React, { useEffect,Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTraining } from '../../actions/training';
import Spinner from '../layout/Spinner';
import InscriptionItem from './InscriptionItem'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';



const Inscriptions = ({getTraining, training:{training, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getTraining(id);
  }, [getTraining ,id]);
  
  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= training && training.inscriptions.length / 1 &&
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
<Link to='/trainings'>
<button className='btn'  type="button">Trainings</button>  
</Link>
<table className='table2'>
  <tbody>
    <tr>
        <th className='userAddress'>name</th>
        <th className='userAddress'>email</th>
        <th className='userAddress'>phone</th>
        <th className='userAddress'>university</th>
        <th className='userAddress'>location</th>
        <th className='contact'>option</th>
    </tr>
    {
training && training.inscriptions.length > 0 ? training && training.inscriptions.slice(page * 5 - 5, page * 5).map((inscription, index) => {
  return (<tr >
    <td className='userAddress f-weight'>{inscription.name}</td>
    <td className='userBirth f-weight'>{inscription.email}</td>
    <td className='userPhone f-weight'>{inscription.phone}</td>
    <td className='userAddress f-weight'>{inscription.university}</td>
    <td className='userAddress f-weight'>{inscription.location}</td>
    <td className='userAddress f-weight'>{inscription.option}</td>

  </tr>)
}) : <tr>
    <td colSpan="7" className="no-results">You don't have any inscriptions yet.</td>
  </tr>
}
    </tbody>
</table>


{/* JSX PArt */}
{
    training && training.inscriptions.length > 0 && <div className='pagination'>
        <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
            <MdKeyboardArrowLeft size={25} />
        </div>
        <div className='pageNumbers'>
            {
                 [...Array(Math.ceil(training && training.inscriptions.length / 5))].map((n, i) => {
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

Inscriptions.propTypes ={
 training: PropTypes.object.isRequired,
 getTraining: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  training: state.training
});
export default connect(mapStateToProps, {getTraining})(Inscriptions)
