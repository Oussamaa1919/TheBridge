const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  photos: [{
    type: String,
  }],
  originalUserName: {
  type: String
},
originalUserAvatar: {
  type: String
},
originalDate:{
  type: Date,
},
shared: {
  type: Boolean,
  default: false
},
originalUser:{
  type: Schema.Types.ObjectId
},
originalPostId:{
  type: Schema.Types.ObjectId
},
shares: [
  {
    user: {
      type: Schema.Types.ObjectId
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
  }
],
});




module.exports = mongoose.model('post', PostSchema);
