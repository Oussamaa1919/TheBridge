import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { getCompanies } from '../../actions/companies';
import formatDate from '../../utils/formatDate';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
const Companies = ({ getCompanies, profiles }) => {
  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= profiles.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}

  



  return (
    <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Companies:
  </h1>
  
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>Company</th>
          <th className='usersocial'>Social</th>
          <th className='userPhone'>Phone</th>
          <th className='userAddress'>Loaction</th>
          <th className='userAddress'>website</th>
          <th className='userAddress'>verified</th>


          
          
          
      </tr>
      {
  profiles.length > 0 ? profiles.slice(page * 5 - 5, page * 5).map((profile, index) => {
    return (<tr >
      <td>
<div className='userDetails'>
<div className='userPic'>
<img src={profile.company.avatar} alt='' />
</div>
<div className='userHandles'>
<p className='userName'>{profile.company.name}</p>
<div className='userEmail'>{profile.company.email}</div>
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
            <td className='userAddress f-weight'>{profile.phone}</td>
            <td className='userAddress f-weight'>{profile.location}</td>

      <td className='userBirth f-weight'><a  href={profile.website}>{profile.website} </a></td>
      <td className='userAddress f-weight'>
                  {profile.company.verified ? 'Verified' : <button className='contactCTA'>Verify</button>}
                </td>
      

      
      
      
      
      
      
    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">There is no companies yet </td>
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
  profiles: state.companies.profiles,
});

export default connect(mapStateToProps, { getCompanies })(Companies);