import React from 'react'
import InternshipItem from './InternshipItem'
import RightSideBar from '../layout/RightSideBar';

const Internships = () => {
  return (
    <section className='internships'>
        <RightSideBar />
      <div className='internship'>
        
        <h1>
          Come on and start your professional career  <i class="fas fa fa-solid fa-hand-peace"></i>       
          </h1>
        <p>Become who you want to be with The Bridge !</p>
        
        <p>My advice for future interns would be to make the most of it.
           Take every opportunity to learn from your bosses and people who have worked in your industry as well as doing some sightseeing!
        </p>
      <InternshipItem/>
      <InternshipItem/>
      <InternshipItem/>
      <InternshipItem/>
      <InternshipItem/>
      <InternshipItem/>
      
      </div>
      
      </section>
    
  )
}

export default Internships
