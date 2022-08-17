import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
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
  );

  const guestLinks = (
    <ul>
      
      <li>
        <Link to="/register"><i className="fas fa-regular fa-user-plus"></i>{' '}Register</Link>
      </li>
      <li>
        <Link to="/login"><i className="fas fa-regular fa-arrow-right "></i> {' '}Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> The Bridge
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
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
