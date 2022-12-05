import React from 'react'
import more from '../../img/more.png'
import Menapik from '../../img/menapik.png'
import Menapik2 from '../../img/menapik2.png'
import thoruser from '../../img/thorsystem-user.png'
import thorsystem from '../../img/thorsystem.png'
import uxersuser from '../../img/uxers-user.png'
import uxers from '../../img/uxers.png'
import logo from '../../img/the-bridge-logo.png'



const RightSideBar = () => {
  return (
    
      <div class="right-sidebar">
      <div class="sidebar-news">
        <img src={more} class="info-icon" alt='' />
        <h3>Trending news</h3>
        <a href="#"> High demand for skilled manpower</a>
        <span>1d ago & middot; 10,934 readres</span>

        <a href="#"> Careers growing horizontally too</a>
        <span>1d ago & middot; 1.552 readres</span>

        <a href="#"> less work visa for US,more UK</a>
        <span>1d ago & middot; 1.600 readres</span>

        <a href="#"> More hiring = higher confidance ?</a>
        <span>18h ago & middot; 8,204 readres</span>

        <a href="#"> MGautam adani is the world's third richest</a>
        <span>12h ago & middot; 6,304 readres</span>


        <a href="#" class="read-more-link">Read more</a>
      </div>
     
      <div class="sidebar-Ad">
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
       <div class="sidebar-useful-links">
        <a href="#">about</a>
        <a href="#">Accessibility</a>
        <a href="#">Help Center</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Advertising</a>
        <a href="#">Get the App</a>
        <a href="#">More</a>
        
        <div class="copyright-msg">
          <img src={logo} alt=''/>
          <p>The Bridge &#169; 2022. All right reserved</p>
        </div>

       </div>
     </div>
    
  )
}

export default RightSideBar