
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Login from '../auth/Login';


const SideBar = ({ auth: { isAuthenticated , admin}, logout }) => {
  
 

  
  const authLinks = (
  <Fragment>
  <div className='container'>
    <div className='navigation'>
      <ul>
      <li>
          <a href='#'>
            <span ><img src={admin && admin.avatar} alt=''/></span>
            <span className="title">{admin && admin.name}</span>
          </a>
        </li>
        <li>
          <a href='#'>
            <span className="icon"><i class=" fas fa-solid fa-house-user" /></span>
            <span className="title">Dashbord</span>
          </a>
        </li>
        <li>
        <a href="#">
            <span className="icon"> <i class=" fas fa-solid fa-briefcase" /></span>
            <span className="title">Internships</span>
          </a>
          </li>
          <li>
        <a href="#">
            <span className="icon"><i class="fas fa-duotone fa-laptop-code"></i></span>
            <span className="title">Trainings</span>
          </a>
          </li>
        <li>
        <a onClick={logout}  href='#'>
       <span className='icon'> <i className="fas fa-sign-out-alt" />{' '} </span>
        <span className="title">Logout</span>
      </a>
        </li>
      </ul>

    </div>
    
  </div>
  </Fragment>
  );
  const guestLinks = (    
      <Login />  
);
  return (
    <nav className='navbar bg-dark' > 
      <Fragment>{isAuthenticated ? authLinks  : guestLinks }</Fragment>
    </nav>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout }) (SideBar)
