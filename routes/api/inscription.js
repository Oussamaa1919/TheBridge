const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');
const Inscrption = require('../../models/Inscription');



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

module.exports = router;
