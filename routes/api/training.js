const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminauth = require('../../middleware/adminauth');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

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

// @route    GET api/trainings/:id
// @desc     Get training by ID
// @access   Private
router.get('/:id', adminauth, checkObjectId('id'), async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ msg: 'training not found' });
    }

    res.json(training);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


// @route    Training api/trainings
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
  check('date', 'coach is required').notEmpty(),
  check('status', 'status is required').notEmpty(),
  

  
  

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
        status: req.body.status,
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
    try{
    const trainingId= req.params.id;
    const updatedTraining = req.body;
    const training = await Training.findByIdAndUpdate(trainingId, updatedTraining, {new:true});
    
    if(!training){
      res.status(404).json({message: 'training not found'});
    }else {
      res.json(training);
    }
    
    
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/trainings/:id
// @desc     Delete a training
// @access   Private
router.delete('/:id', [adminauth, checkObjectId('id')], async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ msg: 'Training not found' });
    }

    // Check user
    if (training.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await training.remove();

    res.json({ msg: 'Training removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/trainings/inscription/:id
// @desc     inscription
// @access   Private
router.post(
  '/inscription/:id',
  auth,
  checkObjectId('id'),
  check('phone', 'Phone is required').notEmpty(),
  check('university', 'University is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  check('option', 'Option is required').notEmpty(),




  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const training = await Training.findById(req.params.id);

      const existingInscription = training.inscriptions.find(inscription => inscription.user.toString() === req.user.id);
      if (existingInscription) {
        
        return res
          .status(400)
          .json({ errors: [{ msg: 'You applied for this training' }] });
      }

      const newInscription = {
        phone: req.body.phone,
        university: req.body.university,
        location: req.body.location,
        option:req.body.option,  
        name: user.name,
        email: user.email,
        user: req.user.id
      };

      training.inscriptions.unshift(newInscription);

      await training.save();

      res.json(training.inscriptions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// get the user inscriptions
router.get('/user/:id/trainings', [auth, checkObjectId('id')],async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user document based on their user ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all internships that the user has applied for
    const trainings = await Training.find({ 
      inscriptions: { 
        $elemMatch: { user: user._id } 
      } 
    });

    return res.json(trainings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


//delete an inscription
router.delete('/inscription/:id/:inscriptionId', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    // Check if the internship exists
    if (!training) {
      return res.status(404).json({ msg: 'Training not found' });
    }

    // Check if the inscription exists
    const inscription = training.inscriptions.find(
      (inscription) => inscription.id === req.params.inscriptionId
    );
    if (!inscription) {
      return res.status(404).json({ msg: 'Inscription not found' });
    }

    // Check if the user is authorized to delete the inscription
    if (inscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove the inscription
    training.inscriptions = training.inscriptions.filter(
      (inscription) => inscription.id !== req.params.inscriptionId
    );

    await training.save();

    res.json({ msg: 'Inscription removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;