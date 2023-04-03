const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
 
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
    
  },
  description: {
    type: String,
    required: true,
    
  },
  phone: {
    type: String,
    required: true,
    
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  verified: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('companyprofile', CompanyProfileSchema);
