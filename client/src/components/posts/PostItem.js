import React, { Fragment ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link,useParams } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import thumb from '../../img/thumbsup.png';
import post1 from '../../img/post-image-1.png';
import {  useState } from 'react';
import { getPost } from '../../actions/post';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
const PostItem = ({
  getPost,
  addLike,
  removeLike,
  deletePost,
  auth,
  profile:{profile},
  post: { _id, text, name,avatar, user, likes, comments, date ,photos,originalUserName,originalUserAvatar,originalDate,shared,originalUser},
  showActions
}) => {
  const [displaySComments, toggleComments] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  

  const handleClick = () => {
    if (liked) {
      removeLike(_id);
    } else {
      addLike(_id);
    }
    setLiked(!liked);
  };
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const firstLike = likes[0];
  const otherLikes = likes.slice(1);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeOnOtherClick = (event) => {
    if (event.target.className === 'others-btn') {
      setShowModal(false);
    }
  };

  return (
  
  
  
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
      
    {shared ? (
              <>
              <div className='post-author-shared'>
              <Link to={`/profile/${originalUser}`}>
              <img src={originalUserAvatar} alt="Original user avatar"  />
              </Link>
              <div>
                <h1>{originalUserName}</h1>
                
                <small className="post-date">Posted on {formatDate(originalDate)}</small>
                </div>
                </div>
              </>
            ) : (
              <h1></h1>
            )}
    

      <p className="my-1">{text}</p>
      {photos &&
        photos.map((photo) => (
          <img key={photo} src={photo} alt="Post photo" className="post-photo" />
        ))}
      <div className='post-stats'>
        <div className='like-stats'>
        <img src={thumb} alt=''/>
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        <span>
      <div className='likesname' onClick={toggleModal}>
      <span className='firstlike'>
      
      {likes.length>0 &&  (
      <Link to={`/profile/${firstLike.user}`} >
      
      <img src={firstLike.avatar} className='like-img'  />
      
        <p>{firstLike.name}</p>
        
        </Link>
        
        
      )}
      </span>
        {otherLikes.length > 0 && <p className='others'>&{otherLikes.length} others</p>}
      </div>
      {showModal && (
        <div className='modal' onClick={closeOnOtherClick}>
          <div className='modal-content'>
            
            <ul>
              {otherLikes.map((like) => (
                <li key={like.user}>
                  
                 
                  <Link to={`/profile/${like.user}`}  className= "likeLink">
                  <img src={like.avatar}  />
                  <p>{like.name} </p>
                  
                  </Link>
                  </li>
              ))}
               <p className='others-btn'>Click to close</p>
            </ul>
           
          </div>
        </div>
      )}
    </span>
        
        </div>
        
        <div>
      <Link to={`/posts/${_id}`} >       <span className="comment-count ">{comments.length} comments</span>
      </Link>

        </div>
      </div>
      {
      
      
      showActions && (
        <Fragment >
          <div className='post-activity'>
          <img className='post-activity-user-icon'  src={avatar} alt="" />
          
          
          
          <button onClick={handleClick} type="button" className="btn-like">
      <i className={`fas fa-thumbs-${liked ? 'down' : 'up'}`} />{' '}
      <span>{liked ? 'Unlike' : 'Like'}</span>
    </button>
          
          
          
          <button onClick={() => toggleComments(!displaySComments)} className="btn-like">
          
          <i className="fas fa-solid fa-comment"></i>
            Comment{' '}
           
          
          </button>
          
          
          
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
  {displaySComments && (
    
      <section>
        <CommentForm postId={_id} />
      <div className="comments">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={_id} />
        ))}
      </div>
      </section>
            
           
            
          )}
  </div>
);
          };


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
  profile:PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
 
  
  
};


const mapStateToProps = (state) => ({
  auth: state.auth,
  profile:state.profile,
  
});

export default connect(mapStateToProps, { getPost, addLike, removeLike, deletePost })(
  PostItem
);
