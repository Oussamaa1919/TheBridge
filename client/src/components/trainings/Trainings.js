import React ,{ useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrainingItem from './TrainingItem'
import { getTrainings } from '../../actions/training';

import RightSideBar from '../layout/RightSideBar';
const Trainings = ({getTrainings,training:{trainings}}) => {

  useEffect(() => {
    getTrainings();
  },[getTrainings])

  return (
    
      
      <section className='trainings'>
        <RightSideBar />
      <div className='training'>
        
        <h1>
          We are here to help  <i class="fas fa-solid fa-hand-holding-medical"></i>
          
          </h1>
        <p>Become who you want to be with The Bridge. 
          Choose your own career path and earn an online degree
           with hands-on projects and weekly one-on-one mentoring sessions with a dedicated professional in your field.</p>
      
      {trainings.map((training) =>(<TrainingItem key={training._id} training={training}/>))
      
}
      </div>
      
      </section>
    
  )
}

Trainings.propTypes ={
  getTrainings: PropTypes.func.isRequired,
  training: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   training: state.training
 });
export default connect(mapStateToProps, { getTrainings }) (Trainings)

