import React , { useState }from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPassword} from '../../actions/auth';

const ForgetPasswordForm = ({forgotPassword}) => {

  const [formData, setFormData] = useState({
    email: '',
   
  });
  const navigate = useNavigate();

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email,navigate);
  };

  return (
    <section className="login-container">
      <h2 className="large text-login">Forgot Password ?</h2>
      <p className="lead">
        <i className="fas fa-user" /> Please tap your email to reset password 
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            
          />
        </div>
       
        <input type="submit" className="btn btn-login" value="Send" />
        <p className="my-1">
      <Link to="/login">Back to Login  ?</Link>
      </p>
      </form>
      
      
      
    </section>
  );
}

ForgetPasswordForm.propTypes = {
  forgotPassword: PropTypes.func.isRequired,

};



export default connect(null, { forgotPassword })(ForgetPasswordForm);
