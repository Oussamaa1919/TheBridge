const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminauth = require('../../middleware/adminauth');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Internship = require('../../models/Internship');
const Admin = require('../../models/Admin');
const checkObjectId = require('../../middleware/checkObjectId');
const multer  = require('multer')
const upload = require('../../middleware/storage')





// @route    GET api/internships
// @desc     Get all internships
// @access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const internships = await Internship.find().sort({ date: -1 });
    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', adminauth, checkObjectId('id'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(internship);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


// @route    POST api/trainings
// @desc     Create a training
// @access   Private

router.post(
  '/',
  adminauth,
  check('title', 'title is required').notEmpty(),
  check('description', 'description is required').notEmpty(),
  check('location', 'location is required').notEmpty(),
  check('periode', 'periode is required').notEmpty(),
  check('technologies', 'technologies is required').notEmpty(),
  check('type', 'type is required').notEmpty(),
  check('requirements', 'requirements is required').notEmpty(),
  check('company', 'company is required').notEmpty(),


  

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admin = await Admin.findById(req.admin.id).select('-password');

      const newInternship = new Internship({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        periode: req.body.periode,
        technologies: req.body.technologies,
        type: req.body.type,
        requirements: req.body.requirements,
        company: req.body.company,
        date: req.body.date,
        admin: req.admin.id
      });

      const internship = await newInternship.save();

      res.json(internship);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    Update api/internship
// @desc     Update a internship
// @access   Private

router.put(
  '/:id',
  adminauth,checkObjectId('id'),
  
  async (req, res) => {
    try{
    const internshipId= req.params.id;
    const updatedInternship = req.body;
    const internship = await Internship.findByIdAndUpdate(internshipId, updatedInternship, {new:true});
    
    if(!internship){
      res.status(404).json({message: 'internship not found'});
    }else {
      res.json(internship);
    }
    
    
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route    DELETE api/internship/:id
// @desc     Delete an internship
// @access   Private
router.delete('/:id', [adminauth, checkObjectId('id')], async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check user
    if (internship.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await internship.remove();

    res.json({ msg: 'Internship removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/internships/inscription/:id
// @desc     inscription
// @access   Private
router.post(
  '/application/:id',upload.fields([{name: 'resume'}, {name: 'coverletter'}]),
  auth,
  checkObjectId('id'),
  check('phone', 'phone is required').notEmpty(),
  check('university', 'university is required').notEmpty(),
  check('location', 'location is required').notEmpty(),
  





  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const internship = await Internship.findById(req.params.id);

      const newInscription = {
        phone: req.body.phone,
        university: req.body.university,
        location: req.body.location,
        resume: req.files['resume'][0].filename,
        coverletter: req.files['coverletter'][0].filename,
        name: user.name,
        email: user.email,
        user: req.user.id
      };
      console.log({req: req.files.resume})
      internship.inscriptions.unshift(newInscription);

      await internship.save();

      res.json(internship.inscriptions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;