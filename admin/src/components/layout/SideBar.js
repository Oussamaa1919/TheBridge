
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


const SideBar = ({ auth: { isAuthenticated }, logout }) => {
  
  
  
  const authLinks = (
  <Fragment>
  <div className='container'>
    <div className='navigation'>
      <ul>
        <li>
        <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt" />{' '}
        <span >Logout</span>
      </a>
        </li>
      </ul>

    </div>
    
  </div>
  </Fragment>
  );
  const guestLinks = (
    <div>
      <h1>hiiii</h1>
</div>
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
