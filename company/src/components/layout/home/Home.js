import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeActions from './HomeActions';

import { getCurrentProfile, deleteAccount } from '../../../actions/profile';



const Home = ({
  getCurrentProfile,
  deleteAccount,
  auth: { company },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section >
     
      <div className=' container-trainings '>
        <div className='main'>
          <div className='profile-main table'>
      
       <div className='profile-container-inner'>

       <div className='verified'>
      {company && company.verified ? (
       <span><i className="fas fa-solid fa-user-check fa-2xl" style={{ fontSize: '27px' }}></i></span> 
      ) : (

        <span className='tooltip'>
          <i className="fas fa-regular fa-user-clock  " style={{ fontSize: '27px' }}></i>
          <span className="tooltiptext">This account will be verified soon !</span>
          </span> 
      )}
    </div>

        <img src={company && company.avatar} alt='' className='profile-pic'/>
        
        <h3 className='i-profile'><i className=" fas fa-solid fa-user"></i>&middot;{company && company.name}</h3>
        
        <h3 className='i-profile'><i className="fas fa-solid fa-envelope"></i>&middot;{company  && company.email}</h3>
        <h3 className='i-profile'> <i className="fas fa-solid fa-phone"></i>&middot;{profile  && profile.phone}</h3>
        <h3><a  className='i-profile' href={profile && profile.website}> <i className="fas fa-solid fa-link"></i>&middot;{profile && profile.website}</a></h3>
        <h3 className='i-profile'><i className="fas fa-solid fa-thumbtack"></i>&middot;{profile && profile.location}</h3>
     
      &middot; <Link to='/edit-profile' >
        <i className='fas fa-user-circle ' /> Edit Profile
        </Link>
        &middot;
        
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
              <p> {profile && profile.description}</p>
              
            </div>

            

        {profile !== null ? (
        <>
          
          

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
      </div>
      </div>
    </section>
  );
};

Home.propTypes = {
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
  Home
);