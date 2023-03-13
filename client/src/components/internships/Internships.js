import React ,{ useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InternshipItem from './InternshipItem'
import RightSideBar from '../layout/RightSideBar';
import { getInternships } from '../../actions/internship';

const Internships = ({getInternships,internship:{internships}}) => {

  useEffect(() => {
    getInternships();
  },[getInternships])

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
      {internships.map((internship) =>(<InternshipItem key={internship._id} internship={internship}/>))
      
    }
      
      
      </div>
      
      </section>
    
  )
}

Internships.propTypes ={
  getInternships: PropTypes.func.isRequired,
  internship: PropTypes.object.isRequired,
 }
 const mapStateToProps = (state) => ({
   internship: state.internship
 });
export default connect(mapStateToProps, { getInternships }) (Internships)
