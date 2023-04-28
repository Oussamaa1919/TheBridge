const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const multer = require('multer');


const EventSchema = new Schema({
   admin: {
    type:Schema.Types.ObjectId
   },
   
   
   title :{
     type: String,
     required: true
   },
   
  
  location :{
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

    }
  ]
})

module.exports = mongoose.model('event', EventSchema);