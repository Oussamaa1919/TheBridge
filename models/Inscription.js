const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InscriptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
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
  type: {
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
});

module.exports = mongoose.model('inscription', InscriptionSchema);