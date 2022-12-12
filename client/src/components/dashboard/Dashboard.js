import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import cover from '../../img/cover-pic.png'
import RightSideBar from '../layout/RightSideBar';


const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section >
      <RightSideBar />
      <div className='profile-main'>
      <img src={cover} className='profile-cover' alt=''/>
       <div className='profile-container-inner'>
        <img src={user && user.avatar} alt='' className='profile-pic'/>
        
        <h1>{user && user.name}</h1>
        
        <b>{profile && profile.status}</b>
        
        <p>{profile && profile.location} &middot; <Link to='/edit-profile' >
        <i className='fas fa-user-circle ' /> Edit Profile
        </Link>
        &middot;
        
     
      </p>

        <div className='social-links'>
        {profile && profile.social
          ? Object.entries(profile && profile.social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='social-link'
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
            </div>

            
            
            <div className='profile-description'>
              <h2>About</h2>
              <p> {profile && profile.bio}</p>
              <a class="see-more-link">See more...</a>
            </div>

            

        {profile !== null ? (
        <>
          
          <Experience experience={profile.experience} />
          
         
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
          
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
       </div>
     
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
