import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import thumb from '../../img/thumbsup.png';
import post from '../../img/post-image-1.png';


const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  profile:{profile},
  post: { _id, text, name,avatar, user, likes, comments, date },
  showActions
}) => (
  <div>
    
  <div className="post">
  
    <div className='post-author'>
      <Link to={`/profile/${user}`}>
        <img  src={avatar} alt="" />
        
      </Link>
      <div>
        <h1>{name}</h1>
        <small>{profile && profile.status}</small>
        <small className="post-date">Posted on {formatDate(date)}</small>
      </div>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <img className='post-img' src={post} alt=''/>
      <div className='post-stats'>
        <div className='like-stats'>
        <img src={thumb} alt=''/>
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </div>
        
        <div>

        <span className="comment-count">{comments.length} comments</span>
        </div>
      </div>
      {showActions && (
        <Fragment >
          <div className='post-activity'>
          <img className='post-activity-user-icon'  src={avatar} alt="" />
          
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn-like"
          > 
            <i className="fas fa-thumbs-up" />{' '}
            
            <span>Like</span>
          </button>
          
          
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn-like"
          > 
            <i className="fas fa-thumbs-down" />
            <span>Unlike</span>
          </button>
          
          
          <Link to={`/posts/${_id}`} className="btn-like">
          <i className="fas fa-solid fa-comment"></i>
            Comment{' '}
            
          </Link>
          
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn-like"
            >
              <i className="fas fa-times" />
              <span>Delete</span>
            </button>
          )}
          </div>
        </Fragment>
      )}
    </div>
  </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  profile:PropTypes.object.isRequired
  
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
