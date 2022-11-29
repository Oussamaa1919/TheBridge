import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    
      <Fragment>
      <div className='navbar-left'>

      <h1>
        <Link to="/" className='logo'>
          <img  src={require('../../img/the-bridge-logo.png')}/>
        </Link>
      </h1>
      </div>

      <div className="search-box">
      <img src={require('../../img/search.png')} />
      <input type="text" placeholder="Search" />
     </div>

     

     
      
      <div className='navbar-center'>
    <ul>
      <li>
        <Link to="/profiles">
        <i class="fas fa-solid fa-address-card" /> {' '}
          Internors
          </Link>
      </li>
      <li>
        <Link to="/posts">
        <i class="fas fa-solid fa-language"/> {' '}
          Posts
          </Link>
      </li>
      <li>
        <Link to="/training">
        <i class="fas fa-solid fa-award" /> {' '}
          <span className="hide-sm">Trainings</span>
        </Link>
      </li>
      <li>
        <Link to="/events">
        <i class="fas fa-solid fa-calendar" /> {' '}
          <span className="hide-sm">Events</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      
     <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
    </div>


    </Fragment>
  );

  const guestLinks = (
    
     
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
