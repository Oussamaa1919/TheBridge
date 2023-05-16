const mongoose = require('mongoose');
const p_img = 'C:\\Users\\oussema\\Desktop\\pfe\\TheBridge-main\\images\\profile-img.jpg';
const CompanySchema = new mongoose.Schema({
 
 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  profileimage: {
    type: String,
    default: p_img
  },
  resetPasswordToken :{
    type: String,
    default:''
  }
});

module.exports = mongoose.model('company', CompanySchema);
