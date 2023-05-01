import React from 'react'
import more from '../../img/more.png'
import Menapik from '../../img/menapik.png'
import Menapik2 from '../../img/menapik2.png'
import thoruser from '../../img/thorsystem-user.png'
import thorsystem from '../../img/thorsystem.png'
import uxersuser from '../../img/uxers-user.png'
import uxers from '../../img/uxers.png'
import logo from '../../img/the-bridge-logo.png'
import Events from '../events/Events'


const RightSideBar = () => {
  return (
    
    <div className="right-sidebar">
      <div className="sidebar-news">
        <img src={more} className="info-icon" alt='' />
        <h3>Comming Events</h3>
        <Events />
      </div>
     
      <div className="sidebar-Ad">
        <small>Ad &middot; &middot; &middot;</small>
        <div id="slideset1">
          <div>
            <p>Menapik</p>
            
            <img src={Menapik}  alt='' />
            <img src={Menapik2} alt='' />
                     
          </div>
          <div>
            <p>Thor System</p>
            
            <img src={thoruser} alt='' />
            <img src={thorsystem} alt='' />
            
          </div>
          <div>
            <p>The UXers</p>
            
            <img src={uxersuser} alt=''/>
            <img src={uxers} alt=''/>
            
          </div>
        </div>
       </div>
       <div className="sidebar-useful-links">
        
        
        <div className="copyright-msg">
          <img src={logo} alt=''/>
          <p>The Bridge &#169; 2022. All right reserved</p>
        </div>

       </div>
     </div>
    
  )
}

export default RightSideBar
