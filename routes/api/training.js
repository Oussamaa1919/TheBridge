const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminauth = require('../../middleware/adminauth');

const Training = require('../../models/Training');
const Admin = require('../../models/Admin');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/trainings
// @desc     Get all trainings
// @access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const trainings = await Training.find().sort({ date: -1 });
    res.json(trainings);
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
  check('price', 'price is required').notEmpty(),
  check('location', 'location is required').notEmpty(),
  check('periode', 'periode is required').notEmpty(),
  check('coach', 'coach is required').notEmpty(),
  
  

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admin = await Admin.findById(req.admin.id).select('-password');

      const newTraining = new Training({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        periode: req.body.periode,
        coach: req.body.coach,
        date: req.body.date,
        admin: req.admin.id
      });

      const training = await newTraining.save();

      res.json(training);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    Update api/trainings
// @desc     Update a training
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
      const training = new Training({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        periode: req.body.periode,
        coach: req.body.coach,
        date: req.body.date,
        admin: req.admin.id


      });
      Training.updateOne({_id: req.params.id}, training).then( 
        ()=>res.status(201).json({
          message: 'Training updated successfully !'
        })
      )
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;