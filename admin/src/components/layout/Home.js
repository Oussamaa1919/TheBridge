import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { getProfiles,blockProfile, unblockProfile } from '../../actions/users';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';




const Home = ({ getProfiles,blockProfile, unblockProfile, profiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= profiles.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}

const handleBlock = (userId) => {
  blockProfile(userId); // Call blockProfile action with profileId as parameter
}

const handleUnblock = (userId) => {
  unblockProfile(userId); // Call unblockProfile action with profileId as parameter
}



  return (
    <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Users:
  </h1>
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>User</th>
          <th className='usersocial'>Social</th>
          <th className='userPhone'>status</th>
          <th className='userAddress'>Loaction</th>
          <th className='userAddress'>company</th>
          <th className='userAddress'>Block</th>



          
          
          
      </tr>
      {
         profiles.length > 0 ? profiles.slice(page * 5 - 5, page * 5).map((profile, index) => {
    return (<tr key={profile._id}>
      <td>
      <div className='userDetails'> 
            <div className='userPic'>
            <img src={profile.user.avatar} alt='' />
      </div>
        <div className='userHandles'>
          <p className='userName'>{profile.user.name}</p>
          <div className='userEmail'>{profile.user.email}</div>
        </div>
        </div>
        </td>
       <td className='userAddress f-weight'><div className='social-links'>
        {profile && profile.social
          ? Object.entries(profile && profile.social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='social-link'
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
            </div></td>
            <td className='userAddress f-weight'>{profile.status}</td>
            <td className='userAddress f-weight'>{profile.location}</td>

      <td className='userAddress f-weight'>{profile.company} </td>
      <td className='userAddress f-weight'>
      {profile.user.blocked ? (
  <button
    className='contactCTA'
    onClick={() => handleUnblock(profile.user._id)}
  >
    Unblock
  </button>
) : (
  <button
    className='contactCTA'
    onClick={() => handleBlock(profile.user._id)}
  >
    Block
  </button>
)}
 </td>

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">There is no users yet </td>
    </tr>
}
      </tbody>
  </table>

  

  {/* JSX PArt */}
  {
      profiles.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(profiles.length / 5))].map((n, i) => {
                      return <div  
                      className={`num ${page === i + 1 ? `numActive` : ''}`} 
                      onClick={() => selectPageHandle(i + 1)} >{i + 1}</div>
                  })
              }
          </div>
          <div className='arrows' onClick={() => selectPageHandle(page + 1)}>
              <MdKeyboardArrowRight size={25} />
          </div>
      </div>
  }
</div>
</div>
</div>
)
}



const mapStateToProps = state => ({
  profiles: state.users.profiles,
});

export default connect(mapStateToProps, { getProfiles ,blockProfile, unblockProfile })(Home);