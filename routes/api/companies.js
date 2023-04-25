const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');
const adminauth = require('../../middleware/adminauth');

const Companyprofile = require('../../models/CompanyProfile');
const Company = require('../../models/Company');

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/companyprofiles',adminauth, async (req, res) => {
  try {
    const companyprofiles = await Companyprofile.find().populate('company', ['name','email', 'avatar', 'verified']);
    res.json(companyprofiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/company/:company_id',
  checkObjectId('company_id'),
  async ({ params: { company_id } }, res) => {
    try {
      const companyprofile = await Companyprofile.findOne({
        company: company_id
      }).populate('company', ['name', 'email','avatar']);

      if (!companyprofile) return res.status(400).json({ msg: 'Company not found' });

      return res.json(companyprofile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
