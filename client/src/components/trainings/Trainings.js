import React from 'react'
import TrainingItem from './TrainingItem'
import LeftSideBar from '../layout/LeftSideBar';
import RightSideBar from '../layout/RightSideBar';
const Trainings = () => {
  return (
    <div className='trainings'>
      <LeftSideBar />
      <RightSideBar />
      <div className='traing-welcome'><h1>Welcome to our courses</h1></div>
      <div>
      <TrainingItem />
      <TrainingItem />
      
      </div>
    </div>
  )
}

export default Trainings
