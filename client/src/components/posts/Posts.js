import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import LeftSideBar from '../layout/LeftSideBar';
import RightSideBar from '../layout/RightSideBar';
const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div>
        <RightSideBar />
       <LeftSideBar />
    <section className="posts">
     
      
      <PostForm />
      <div >
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
    </div>
    
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
