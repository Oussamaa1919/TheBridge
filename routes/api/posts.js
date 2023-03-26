const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
const multer  = require('multer')
const upload = require('../../middleware/storage')

// @route    GET api/posts/:id/likes
// @desc     get likes of a post 
// @access   Private
// Route to get the users who liked a post

router.get('/:id/likes', auth ,checkObjectId('id'),async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('likes.user');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    const likes = post.likes.map(like => {
      return {
        userId: like.user._id,
        name: like.name
      };
    });
    res.json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
   upload.fields([
    {name: 'photos', maxCount: 20}
]),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        photos: req.files.photos.map(file => file.filename),
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
console.log(req.files);
      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.id)
    const likedUser = await User.findById(req.user.id).select('name avatar');

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id ,name:likedUser.name,avatar:likedUser.avatar} );
    console.log(post.likes);
    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

router.post('/:postId/share', auth,async (req, res) => {
  try {
    // Find the post by its ID
    const post = await Post.findById(req.params.postId);
    
    const originalUser = await User.findById(post.user);
    
    // Create a new post object with the same content
    const user = await User.findById(req.user.id).select('name avatar');
    
    if(post.shared) {

       sharedPost = new Post({
        
     
        user: req.user.id, // Set the user ID to the current user's ID
        text: post.text,
        name: user.name,
        avatar: user.avatar,
        photos: post.photos,
        originalUserName: post.originalUserName ,
        originalUserAvatar: post.originalUserAvatar ,
        originalDate: post.originalDate ,
        shared: true ,
        originalUser:post.originalUser ,
        // Set the shared field to true
        // Add the original user's name and avatar to the shared post
      });

    }
    else{
     sharedPost = new Post({
        
     
      user: req.user.id, // Set the user ID to the current user's ID
      text: post.text,
      name: user.name,
      avatar: user.avatar,
      photos: post.photos,
      originalUserName: post.name ,
      originalUserAvatar: post.avatar ,
      originalDate: post.date ,
      shared: true ,
      originalUser:originalUser ,
      originalPostId:post.id,
      // Set the shared field to true
      // Add the original user's name and avatar to the shared post
    });
  }
    // Save the new post to the database
    post.shares.unshift({ user: req.user.id ,name:user.name,avatar:user.avatar} );
   await post.save();

    await sharedPost.save();

    // Send the shared post in the response
    res.json(sharedPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
