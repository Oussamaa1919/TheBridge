import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import searchimg from '../../images/search.png'
import logo from '../../images/the-bridge-logo.png'



const Navbar = ({ auth: { isAuthenticated} }) => {

//MenuToggle 

let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
function toggle  (){
  navigation.classList.toggle('active');
  main.classList.toggle('active')
}



  const authLinks = (
    <Fragment>
      <div className="main">
      <div className="topbar">
        <div className="toggle">
        <i className="fas fa-solid fa-bars" onClick={()=>toggle()} />
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
    <div>
    <div className='navbar-left'>

<h1 className='logo2'>
 
   <img  src={logo} alt=''/>
 
</h1>
</div>

   <div className='main-wavy'>
   <div className='wavy'>  
   <span style={{ '--i':1 }}>W</span>
   <span style={{ '--i':2 }}>E</span>
   <span style={{ '--i':3 }}>L</span>
   <span style={{ '--i':4 }}>C</span>
   <span style={{ '--i':6 }}>O</span>
   <span style={{ '--i':7 }}>M</span>
   <span style={{ '--i':8}}>E</span>
   <span style={{ '--i':8}}><i className="fas fa-solid fa-hand-sparkles"></i></span>

   </div>
 </div>
 </div>
  
   
   
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

