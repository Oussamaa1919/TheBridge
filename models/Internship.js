const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InternshipSchema = new Schema({
   admin: {
    type:Schema.Types.ObjectId
   },
   title :{
     type: String,
     required: true
   },
   description :{
    type: String,
    required: true
  },
  type :{
    type: String,
    required: true
  },
  location :{
    type: String,
    required: true
  },
  periode :{
    type: String,
    required: true
  },
  technologies :{
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true 
  },
  date: {
    type: Date,
    
  }
})

module.exports = mongoose.model('internship', InternshipSchema);