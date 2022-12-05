import React ,{useEffect}from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import coverpic from '../../img/cover-pic.png'
import itmes from '../../img/items.png'
import premuim from '../../img/premium.png'
import skillicon from '../../img/skills-icon.png'
import { getCurrentProfile} from '../../actions/profile';
import languageicon from '../../img/language-icon.png'
import hashtagicon from '../../img/hashtag.png'


  

const LeftSideBar = ({ 
  profile: { profile },
  getCurrentProfile,
  auth: { user },
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
  {
    return ( 
      

      
      <div className='left-sidebar'>
        <div className='sidebar-profile-box'>
          <img src={coverpic} alt=''/>
        </div>
        <div className='sidebar-profile-info'>
          <img src={user && user.avatar } alt=""/>
          <h1>{user && user.name}</h1>
          <h3>{profile && profile.status} </h3>
          <ul>
            <li>Company:<span>{profile && profile.company}</span></li>
            <li>Location:<span>@location</span></li>
            <li>Email:<span>{user && user.email}</span></li>           
          </ul>
        </div> 
        <div className='sidebar-profile-link'>
        <span><img src={itmes} alt='' /></span>
        <span><img src={premuim} alt=''/></span>
        </div>
        <div className='sidebar-activity'>
            <h3>Skills</h3>
            <ul>
        {profile &&profile.skills.slice(0,profile.skills.lenght).map((skill, index) => (
          <li key={index} className='text-primary'>
            <img src={skillicon } alt='' /> {skill}
          </li>
        ))}
      </ul>
      </div>
      <div className='sidebar-activity'>

      
      <h3>Languages</h3>
            <ul>
        {profile && profile.languages.slice(0,profile.languages.lenght).map((language, index) => (
          <li key={index} className='text-primary'>
            <img src={languageicon} alt= ''/> {language}
          </li>
        ))}
      </ul>
      </div>
      <div className='sidebar-activity'>
      <h3>Hashtags</h3>
            <ul>
        {profile && profile.hashtags.slice(0,profile.hashtags.lenght).map((hashtag, index) => (
          <li key={index} className='text-primary'>
            <img src={hashtagicon} alt= ''/> {hashtag}
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
  getCurrentProfile: PropTypes.func.isRequired,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps,{ getCurrentProfile})(LeftSideBar);