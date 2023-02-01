import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import searchimg from '../../images/search.png'
const Navbar = ({ auth: { isAuthenticated} }) => {

  const authLinks = (
    <Fragment>
      <div className="main">
      <div className="topbar">
        <div className="toggle">
        <i className="fas fa-solid fa-bars" />
        </div>
        
        <div className="search-box">
      <img src={searchimg } alt=''/>
      <input type="text" placeholder="Search" />
     </div>
        
        
        <div className="user">
          <span><i className=" fas fa-solid fa-bell" /></span>
        </div>
      </div>
      
      </div>
    </Fragment>
  );
  const  guestLinks = (    
    <div>hiii</div> 
);


  return (
    <div className='container'>
      <nav className='navbar bg-dark' > 
      <Fragment>{isAuthenticated ? authLinks  : guestLinks }</Fragment>
    </nav>
    </div>
  )
}
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps) (Navbar)

