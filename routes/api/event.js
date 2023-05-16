const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const adminauth = require('../../middleware/adminauth');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Event = require('../../models/Event');
const Admin = require('../../models/Admin');
const checkObjectId = require('../../middleware/checkObjectId');






// @route    GET api/internships
// @desc     Get all internships
// @access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
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
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
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
  check('location', 'location is required').notEmpty(),
  check('date', 'date is required').notEmpty(),


  

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const admin = await Admin.findById(req.admin.id).select('-password');

      const newEvent = new Event({
        title: req.body.title,
        location: req.body.location,
        date: req.body.date,
        admin: req.admin.id
      });

      const event = await newEvent.save();

      res.json(event);
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
    const eventId= req.params.id;
    const updatedEvent = req.body;
    const event = await Event.findByIdAndUpdate(eventId, updatedEvent, {new:true});
    
    if(!event){
      res.status(404).json({message: 'Event not found'});
    }else {
      res.json(event);
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
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check user
    if (event.admin.toString() !== req.admin.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await event.remove();

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/internships/inscription/:id
// @desc     inscription
// @access   Private
router.post(
  '/participate/:id',
  auth,
  checkObjectId('id'),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const event = await Event.findById(req.params.id);

      // Check if user already applied for this internship
      const existingInscription = event.inscriptions.find(inscription => inscription.user.toString() === req.user.id);
      if (existingInscription) {
        
        return res
          .status(400)
          .json({ errors: [{ msg: 'You  have already participated to this event' }] });
      }

      const newInscription = {
        
        name: user.name,
        email: user.email,
        user: req.user.id
      };
      event.inscriptions.unshift(newInscription);

      await event.save();

      res.json(event.inscriptions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// get the user inscriptions
router.get('/user/:id/events', [auth, checkObjectId('id')],async (req, res) => {
  const id = req.params.id;

  try {
    // Find the user document based on their user ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all internships that the user has applied for
    const events = await Event.find({ 
      inscriptions: { 
        $elemMatch: { user: user._id } 
      } 
    });

    return res.json(events);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/participation/:id/:inscriptionId', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    // Check if the internship exists
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the inscription exists
    const inscription = event.inscriptions.find(
      (inscription) => inscription.id === req.params.inscriptionId
    );
    if (!inscription) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if the user is authorized to delete the inscription
    if (inscription.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove the inscription
    event.inscriptions = event.inscriptions.filter(
      (inscription) => inscription.id !== req.params.inscriptionId
    );

    await event.save();

    res.json({ msg: 'Participation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




module.exports = router;