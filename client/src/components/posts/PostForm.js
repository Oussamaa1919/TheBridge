import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import user from '../../img/user-1.png';
import photoIcon from '../../img/photo.png';
import video from '../../img/video.png';
import event from '../../img/event.png';


const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  
  async function handleOnSubmit(e) {
    e.preventDefault();
       
    const formData = new FormData();
    formData.append('text', text);
    if (photo) {
      formData.append('photo', photo);
    }
    
    await addPost(formData);
    setText('');
    setPhoto(null);
  }
  return (
    <div className="create-post">
    <div className="create-post-input">
      <img src={user} alt=''/>
      <textarea rows="2"
       name='text'
       placeholder="Write a post"
       value={text}
       onChange={e => setText(e.target.value)}
       required
       >

       </textarea>
       
    </div>
    
  <div className="create-post-links">
  <li>
          <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
            <img src={photoIcon} alt='' />
            Photo
          </label>
          <input type="file" id="photo-upload" accept="image/*" onChange={e=>setPhoto(e.target.files[0])}    style={{ display: 'none' }} 
 />
        </li>
      <li><img src={video} alt=''/>Video</li>
      <li><img src={event} alt=''/>Event</li>
      <li>
      <form  encType='multipart/form-data'
      onSubmit={handleOnSubmit}>
      <input type='submit' value='POST' />
      
      </form></li>

    </div>
  </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
 
};

export default connect(
  null,
  { addPost }
)(PostForm);