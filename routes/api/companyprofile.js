const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const companyauth = require('../../middleware/companyauth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Companyprofile = require('../../models/CompanyProfile');
const Company = require('../../models/Company');
const Internship = require('../../models/Internship');
const CompanyProfile = require('../../models/CompanyProfile');

// @route    GET api/companyprofile/me
// @desc     Get current companies profile
// @access   Private
router.get('/me', companyauth, async (req, res) => {
  try {
    
    const companyprofile = await Companyprofile.findOne({
      company: req.company.id
    }).populate('company', ['name','email','avatar']);

    if (!companyprofile) {
      return res.status(400).json({ msg: 'There is no profile for this company' });
    }

    res.json(companyprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    POST api/companyprofile
// @desc     Create or update company profile
// @access   Private
router.post(
  '/',
  companyauth,
  check('description', 'Description is required').notEmpty(),
  check('phone', 'Phone is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      company: req.company.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : '',
      
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let companyprofile = await CompanyProfile.findOneAndUpdate(
        { company: req.company.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(companyprofile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);
// @route    DELETE api/companyprofile
// @desc     Delete profile, company & internships
// @access   Private
router.delete('/', companyauth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      CompanyProfile.findOneAndRemove({ company: req.company.id }),
      Company.findOneAndRemove({ _id: req.company.id })
    ]);

    res.json({ msg: 'company deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
