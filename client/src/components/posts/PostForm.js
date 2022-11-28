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
  
  

  return (
    <div class="create-post">
    <div class="create-post-input">
      <img src={user}/>
      <textarea rows="2"
       name='text'
       placeholder="Write a post"
       value={text}
       onChange={e => setText(e.target.value)}
       required
       >

       </textarea>
    </div>
    <div class="create-post-links">
      <li><img src={photo}/>Photo</li>
      <li><img src={video}/>Video</li>
      <li><img src={event}/>Event</li>
      <li>
      <form 
      onSubmit={e => {
      e.preventDefault();
      addPost({ text });
      setText('');
      }}>
      <input type='submit' value='POST' /></form></li>

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
