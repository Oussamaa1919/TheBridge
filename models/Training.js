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
      option: {
        type: String,
        required: true   
      },
      paid: {
        type: String,
        default:'inpaid'
      }
      

    }
  ]
})

module.exports = mongoose.model('training', TrainingSchema);