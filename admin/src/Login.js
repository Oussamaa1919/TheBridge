import React from 'react';
import admin from './img/admin.png';
import backimg from './img/backimg2.png';



const Login = () => {
  return (
    
<div className="bg-gradient-primary p-5 " style={{ 
      background: `url(${backimg})`,
      height:'100vh',
      backgroundSize:'cover'  
       }}>

 <div className="container p-5" >
   <div className="row justify-content-center p-6" >
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5" >
        <div className="card-body p-0" >
          <div className="row " >
            
        
            <img src={admin} className="col-lg-6 d-none d-lg-block bg-login-image" />

            
              <div className="col-lg-6 ">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1></div>
                      <form className="user">
                      <div className="form-group">
                      <input type="email" className="form-control form-control-user"
                      id="exampleInputEmail" aria-describedby="emailHelp"
                      placeholder="Enter Email Address..."/></div>
                      <div className="form-group">
                      <input type="password" className="form-control form-control-user"
                      id="exampleInputPassword" placeholder="Password"/></div>
                      <a href="index.html" className="btn btn-primary btn-user btn-block">
                      Login</a>     
                            </form>
                            <hr />                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
    </div>
    
    </div>
  )
}

export default Login
