import React, { useEffect,Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInternship } from '../../actions/internships';
import Spinner from '../layout/Spinner';
import InternshipInscriptionItem from './InternshipInscriptionItem'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


const InternshipInscriptions = ({getInternship, internship:{internship, loading}}) => {
  const { id } = useParams();

  useEffect(() => {
    getInternship(id);
  }, [getInternship ,id]);
  const [page, setPage] = useState(1)
  
  const selectPageHandle = (selectedPage) => { // Pagination Logic
    if (selectedPage >= 1 &&
        selectedPage <= internship && internship.inscriptions.length / 1 &&
        selectedPage !== page) {
        setPage(selectedPage)
    }
}

const handleDownloadResume = (resumeUrl) => {
  const link = document.createElement("a");
  link.href = resumeUrl;

  // Extract file extension from resume filename
  const extension = resumeUrl.split(".").pop();
  const filename = `internship && internship.inscriptions.resume.${extension}`;

  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};

const handleDownloadCoverLetter = (coverletterUrl) => {
  const link = document.createElement("a");
  link.href = coverletterUrl;

  // Extract file extension from resume filename
  const extension = coverletterUrl.split(".").pop();
  const filename = `internship && internship.inscriptions.coverletter.${extension}`;

  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
};
  return (
    <div className='container-table2 '>
    <div className='main-table2'>
  <div className='userTable '>
  <h1 className='heading'>
      Applications:
  </h1>
  <Link to='/internships'>
  <button className='btn'  type="button">Internships</button>  
  </Link>
  <table className='table2'>
    <tbody>
      <tr>
          <th className='userAddress'>name</th>
          <th className='userAddress'>email</th>
          <th className='userAddress'>phone</th>
          <th className='userAddress'>university</th>
          <th className='userAddress'>location</th>
          <th className='contact'>resume</th>
          <th className='contact'>coverletter</th>
      </tr>
      {
  internship && internship.inscriptions.length > 0 ? internship && internship.inscriptions.slice(page * 5 - 5, page * 5).map((inscription, index) => {
    return (<tr >
      <td className='userAddress f-weight'>{inscription.name}</td>
      <td className='userBirth f-weight'>{inscription.email}</td>
      <td className='userPhone f-weight'>{inscription.phone}</td>
      <td className='userAddress f-weight'>{inscription.university}</td>
      <td className='userAddress f-weight'>{inscription.location}</td>
      <td className='contact'><button className='contactCTA'
                onClick={() =>
                  handleDownloadResume(
                    `http://localhost:5000/uploads/${inscription.resume}`
                  )
                }
              >
               Resume
              </button> </td>
              <td className='contact'><button className='contactCTA'
                onClick={() =>
                  handleDownloadCoverLetter(
                    `http://localhost:5000/uploads/${inscription.coverletter}`
                  )
                }
              >
               coverletter
              </button> </td>

    </tr>)
  }) : <tr>
      <td colSpan="7" className="no-results">You don't have any internships yet.</td>
    </tr>
}
      </tbody>
  </table>


  {/* JSX PArt */}
  {
      internship && internship.inscriptions.length > 0 && <div className='pagination'>
          <div className='arrows' onClick={() => selectPageHandle(page - 1)}>
              <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='pageNumbers'>
              {
                   [...Array(Math.ceil(internship && internship.inscriptions.length / 5))].map((n, i) => {
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
InternshipInscriptions.propTypes ={
  internship: PropTypes.object.isRequired,
  getInternship: PropTypes.func.isRequired,
 }
 
 const mapStateToProps = (state) => ({
   internship: state.internship
 });

 export default connect(mapStateToProps, {getInternship})(InternshipInscriptions)