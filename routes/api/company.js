const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const companyauth = require('../../middleware/companyauth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const Company = require('../../models/Company');
const Internship = require('../../models/Internship');

const normalize = require('normalize-url');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', companyauth, async (req, res) => {
  try {
    const company = await Company.findById(req.company.id).select('-password');
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let company = await Company.findOne({ email });

      if (!company) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, company.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        company: {
          id: company.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/register',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let company = await Company.findOne({ email });

      if (company) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Company already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      company = new Company({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      company.password = await bcrypt.hash(password, salt);

      await company.save();

      const payload = {
        company: {
          id: company.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/trainings
// @desc     Create a training
// @access   Private

router.post(
  '/addinternship',
  companyauth,
  check('title', 'title is required').notEmpty(),
  check('description', 'description is required').notEmpty(),
  check('location', 'location is required').notEmpty(),
  check('periode', 'periode is required').notEmpty(),
  check('technologies', 'technologies is required').notEmpty(),
  check('type', 'type is required').notEmpty(),
  check('requirements', 'requirements is required').notEmpty(),
  check('companyname', 'companyname is required').notEmpty(),


  

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const company = await Company.findById(req.company.id).select('-password');

      const newInternship = new Internship({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        periode: req.body.periode,
        technologies: req.body.technologies,
        type: req.body.type,
        requirements: req.body.requirements,
        companyname: req.body.companyname,
        date: req.body.date,
        company: req.company.id
      });

      const internship = await newInternship.save();

      res.json(internship);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/myinternships', companyauth, async (req, res) => {
  try {
    const internships = await Internship.find({ company: req.company.id });
    res.json(internships);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/internship/:id', companyauth, async (req, res) => {
  try {
    // Get the internship to be deleted
    const internship = await Internship.findById(req.params.id);

    // Check if the internship exists
    if (!internship) {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    // Check if the authenticated company is the owner of the internship
    if (internship.company.toString() !== req.company.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this internship' });
    }

    // Delete the internship
    await internship.remove();

    res.json({ msg: 'Internship removed' });
  } catch (err) {
    console.error(err.message);

    // Handle the case when the id provided is not a valid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Internship not found' });
    }

    res.status(500).send('Server Error');
  }
});

router.get('/internship/:id/inscriptions', companyauth, async (req, res) => {
  try {
    const company = await Company.findById(req.company.id).select('-password');
    const internship = await Internship.findById(req.params.id);

    // Check if the internship belongs to the company
    if (!internship || internship.company.toString() !== req.company.id) {
      return res.status(401).json({ msg: 'Not authorized to view inscriptions' });
    }

    res.json(internship.inscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/internship/:id/inscription/:inscriptionId', companyauth, async (req, res) => {
  try {
    const company = await Company.findById(req.company.id).select('-password');
    const internship = await Internship.findById(req.params.id);

    // Check if the internship belongs to the company
    if (!internship || internship.company.toString() !== req.company.id) {
      return res.status(401).json({ msg: 'Not authorized to delete inscription' });
    }

    // Remove the inscription from the internship's inscriptions array
    internship.inscriptions = internship.inscriptions.filter(
      (inscription) => inscription._id.toString() !== req.params.inscriptionId
    );

    await internship.save();
    res.json(internship.inscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;