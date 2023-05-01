import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';
import cover from '../../img/cover-pic.png'
import RightSideBar from '../layout/RightSideBar';

const Profile = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
   
        <section >
      <RightSideBar />
      <div className='profile-main'>
      <img src={cover} className='profile-cover' alt=''/>
       <div className='profile-container-inner'>
        <img src={profile && profile.user.avatar} alt='' className='profile-pic'/>
        
        <h1>{profile && profile.user.name}</h1>
        
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
              
            </div>

            

        {profile !== null ? (
        <>
          
          <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
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

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);