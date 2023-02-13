import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInscriptions } from '../../actions/inscription';


const InscriptionList = ({getInscriptions,inscription:{inscriptions}}) => {
  
  useEffect(() => {
    getInscriptions();
  },[getInscriptions])
  
  const inscriptionlist = inscriptions.map((inscription) => (
    <tr  key={inscription._id}>
      <td className='td-1'>{inscription.name}</td>
      <td className='td-2'>{inscription.email}</td>
      <td className='td-3'>{inscription.phone}</td>
      <td className='td-4'>{inscription.university}</td>
      <td className='td-5'>{inscription.location}</td>
      <td className='td-6'>{inscription.type}</td>
      <td className='td-6'>{inscription.option}</td>
      <td className='td-6'>{inscription.paid}</td>
      <td ><button className='btn'  type="button"> 
        Update
        </button></td>
      

    </tr>
  ))
  
  
  
  
  return (
    <Fragment>
    <div className='container-trainings'>
        <div className='main'>
        
        <div className='details'>
        
        <table className="table">
        <div className='Header'>
        <h2>Trainings</h2>
        
        </div>
        <thead>
          <tr className='cardHeader'>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >University</th>
            <th >Loaction</th>
            <th >Type</th>
            <th >Option</th>
            <th >Paid</th>
            <th >Update</th>
            <th />
          </tr>
        </thead>
        <tbody>{inscriptionlist}</tbody>
      </table>
        </div>
      </div>
    </div>
    </Fragment>
  )
}
  InscriptionList.propTypes ={
   getInscriptions: PropTypes.func.isRequired,
   
   inscription: PropTypes.object.isRequired,
  }
  const mapStateToProps = (state) => ({
    inscription: state.inscription
  });
export default connect(mapStateToProps, { getInscriptions }) (InscriptionList)
