import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coverpic from '../../img/cover-pic.png'
import itmes from '../../img/items.png'
import premuim from '../../img/premium.png'
import skillicon from '../../img/skills-icon.png'

const LeftSideBar = ({ 
  profile:{profile},
  isAuthenticated,
  auth: {user},
}) => {
  if (isAuthenticated) {
    return ( 
      
      <div className='left-sidebar'>
        <div className='sidebar-profile-box'>
          <img src={coverpic} />
        </div>
        <div className='sidebar-profile-info'>
          <img src={user &&  user.avatar}/>
          <h1>{ user && user.name}</h1>
          <h3>{profile.status}</h3>
          <ul>
            <li>Company:<span>{profile.company}</span></li>
            <li>Location:<span>@{profile.location}</span></li>
            <li>Email:<span>{user && user.email}</span></li>           
          </ul>
        </div> 
        <div className='sidebar-profile-link'>
        <span><img src={itmes} /></span>
        <span><img src={premuim} /></span>
        </div>
          <div className='sidebar-activity'>
            <h3>Skills</h3>
            <ul>
        {profile.skills.slice(0,profile.skills.lenght).map((skill, index) => (
          <li key={index} className='text-primary'>
            <img src={skillicon}/> {skill}
          </li>
        ))}
      </ul>
          </div>



      </div>
     
    )
  }

};

LeftSideBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  profile:PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
  auth: state.auth, 
});

export default connect(mapStateToProps)(LeftSideBar);