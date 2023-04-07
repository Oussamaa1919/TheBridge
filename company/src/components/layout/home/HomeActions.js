import React from 'react'
import { Link } from 'react-router-dom';
const HomeActions = () => {
  return (
    <div>
      <div className='dash-buttons'>
      <Link to='/edit-profile' >
        <i className='fas fa-user-circle ' /> Edit Profile
      </Link>
    </div>
    </div>
  )
}

export default HomeActions
