const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
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
  price :{
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
  coach :{
    type: String,
    required: true
  },
  status :{
    type: String,
    required: true
  },
  date: {
    type: Date,
    
  }
})

module.exports = mongoose.model('training', TrainingSchema);