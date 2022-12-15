import React from 'react'
import TrainingItem from './TrainingItem'
import RightSideBar from '../layout/RightSideBar';
const Trainings = () => {
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
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
      <TrainingItem />
      </div>
      
      </section>
    
  )
}

export default Trainings
