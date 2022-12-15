import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import user from '../../img/user-1.png'

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const profileMenu = document.getElementById('profileMenu');
   function toggleMenu(){
    profileMenu.classList.toggle("open-menu");
   }
  
  const authLinks = (
    
      <Fragment>
      <div className='navbar-left'>

      <h1>
        <Link to="/" className='logo'>
          <img  src={require('../../img/the-bridge-logo.png')} alt=''/>
        </Link>
      </h1>
      </div>

      <div className="search-box">
      <img src={require('../../img/search.png') } alt=''/>
      <input type="text" placeholder="Search" />
     </div>

     

     
      
      <div className='navbar-center'>
    <ul>
    <li>
        <Link to="/posts">
        <img src={require('../../img/home.png') } alt=''/>
         <span> Home</span>
          </Link>
      </li>
      <li>
        <Link to="/trainings">
        <img src={require('../../img/tttt.png') } alt=''/>
          <span >Trainings</span>
        </Link>
      </li>
      <li>
        <Link to="/internships">
        <img src={require('../../img/jobs.png') } alt=''/>
          <span >Internships</span>
        </Link>
      </li>
      {/* <li>
        <Link to="/profiles">
        <img src={require('../../img/home.png') } alt=''/>
         <span> Internors </span>
          </Link>
      </li>  */}
      
      
      <li>
        <a>
        <img src={require('../../img/notification.png') } alt=''/>
          <span >Notifications</span>
          </a>
      </li>
      
      
     
    </ul>
    </div>
    <div className="navbar-right">
      <div className="online">
        <img src={user} className="nav-profile-img" onClick={()=>toggleMenu()}  alt=''/>
      </div>
    </div>
    
    <div className="profile-menu-wrap" id="profileMenu">
      <div className="profile-menu">
        <div className="user-info">
          <img src={user} alt='' />
          <div>
            <h3>Rayan Walton</h3>
            <Link to="/dashboard">
            <span>See your Profile</span>
            </Link>
          </div>
        </div>
        <hr/>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span >Logout</span>
        </a>
        </div>
        </div>
    </Fragment>
  );

  const guestLinks = (
    <div>
     <div className='navbar-left'>

<h1>
  <Link to="/" className='logo2'>
    <img  src={require('../../img/the-bridge-logo.png')} alt=''/>
  </Link>
</h1>
</div>

    <div className='main-wavy'>
    <div className='wavy'>  
    <span style={{ '--i':1 }}>T</span>
    <span style={{ '--i':2 }}>H</span>
    <span style={{ '--i':3 }}>E</span>
    <span style={{ '--i':4 }}>B</span>
    <span style={{ '--i':6 }}>R</span>
    <span style={{ '--i':7 }}>I</span>
    <span style={{ '--i':8}}>D</span>
    <span style={{ '--i':9}}>G</span>
    <span style={{ '--i':10 }}>E</span>
    </div>
  </div>
  </div>
   
    
    
  );

  return (
    
    <nav className='navbar bg-dark' > 
      <Fragment>{isAuthenticated ? authLinks  : guestLinks }</Fragment>
    </nav>
    
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
