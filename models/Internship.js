const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');


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
  company :{
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
  },
  
  inscriptions:[
    {
      user: {
        type: Schema.Types.ObjectId
      },
      name: {
        type: String,
       
      },
      email: {
        type: String,
        
      },
      phone: {
        type: String,
        required: true
      },
      university: {
        type: String,
        required: true
        
      },
      location: {
        type: String,
        required: true   
      },
      
      resume: {
        type: String,
        required: true
      },
      coverletter: {
        type: String,
        required: true
      }

      

    }
  ]
})

module.exports = mongoose.model('internship', InternshipSchema);