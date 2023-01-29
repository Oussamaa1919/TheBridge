const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminauth = require('../../middleware/adminauth');

const Internship = require('../../models/Internship');
const Admin = require('../../models/Admin');
const checkObjectId = require('../../middleware/checkObjectId');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const internship = new Internship({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        periode: req.body.periode,
        technologies: req.body.technologies,
        type: req.body.type,
        requirements: req.body.requirements,
        date: req.body.date,
        admin: req.admin.id


      });
      Internship.updateOne({_id: req.params.id}, internship).then( 
        ()=>res.status(201).json({
          message: 'Internship updated successfully !'
        })
      )
      
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

module.exports = router;