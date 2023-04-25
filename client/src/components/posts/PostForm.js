import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import user from '../../img/user-1.png';
import photo from '../../img/photo.png';
import video from '../../img/video.png';
import event from '../../img/event.png';


const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  
  async function handleOnSubmit(e) {
    e.preventDefault();
      console.log({photos})
     await  addPost({ text, photos:[...photos] });
      setText('');
      setPhotos([]);

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
      <li><img src={photo} alt=''/>Photo</li>
      <li><img src={video} alt=''/>Video</li>
      <li><img src={event} alt=''/>Event</li>
      <li>
      <form  encType='multipart/form-data'
      onSubmit={e => handleOnSubmit(e)
      }>
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
