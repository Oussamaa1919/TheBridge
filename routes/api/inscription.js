const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const adminauth = require('../../middleware/adminauth')
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
const Inscrption = require('../../models/Inscription');
const Training = require('../../models/Training')


// @route    INSCRIPTION api/posts
// @desc     Create inscription
// @access   Private
router.post(
  '/',
  auth,

  check('option', 'Option is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  check('type', 'Type is required').notEmpty(),
  check('university', 'University is required').notEmpty(),
  check('phone', 'Phone is required').notEmpty(),
  

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newInscription = new Inscrption({
        option: req.body.option,
        type: req.body.type,
        university: req.body.university,
        location: req.body.location,
        phone: req.body.phone,
        name: user.name,
        email: user.email,
        user: req.user.id
      });

      const inscription = await newInscription.save();

      res.json(inscription);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    GET api/inscriptions
// @desc     Get all inscriptions
// @access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const inscriptions = await Inscrption.find().sort({ date: -1 });
    res.json(inscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/inscriptions/:id
// @desc     Get inscription by ID
// @access   Private
router.get('/:id', adminauth, checkObjectId('id'), async (req, res) => {
  try {
    const inscription = await Inscrption.findById(req.params.id);

    if (!inscription) {
      return res.status(404).json({ msg: 'inscription not found' });
    }

    res.json(inscription);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/inscriptions/:id
// @desc     Delete a inscription
// @access   Private
router.delete('/:id', [adminauth, checkObjectId('id')], async (req, res) => {
  try {
    const inscription = await Inscrption.findById(req.params.id);

    if (!inscription) {
      return res.status(404).json({ msg: 'Inscription not found' });
    }

    

    await inscription.remove();

    res.json({ msg: 'Inscription removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
