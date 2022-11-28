import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';




const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  profile:{profile},
  post: { _id, text, name,avatar, user, likes, comments, date },
  showActions
}) => (
  <div className="post">
    <div className='post-author'>
      <Link to={`/profile/${user}`}>
        <img  src={avatar} alt="" />
      </Link>
      <div>
        <h1>{name}</h1>
        <small>{profile.status}</small>
        <small className="post-date">Posted on {formatDate(date)}</small>
      </div>
    </div>
    <div>
      <p className="my-1">{text}</p>
      

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
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
