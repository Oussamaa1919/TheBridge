import React, { useState } from 'react';
import { setAlert } from '../../actions/alert';
import { changePassword } from '../../actions/auth';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const { currentPassword, newPassword, confirmNewPassword } = formData;

  const dispatch = useDispatch();

  const admin = useSelector((state) => state.auth.admin);

  const onSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      dispatch(setAlert("Passwords don't match", 'danger'));
    } else {
      dispatch(changePassword(currentPassword, newPassword, admin._id));
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="login-container">
      <h2 className="large text-login">Password</h2>
      <p className="lead">
        <i className="fas fa-user" /> Change Your password
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={currentPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            minLength="6"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-login" value="Save Changes" />
      </form>
    </section>
  );
};

PasswordForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, changePassword })(PasswordForm);