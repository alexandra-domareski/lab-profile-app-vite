const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { isAuthenticated } = require('../middleware/jwt.middleware');

//singup
router.post('/auth/signup', async (req, res, next) => {
  const { username, password, campus, course } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//login
router.post('/auth/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt:', username, password);
    const foundUser = await User.findOne({
      username: username.trim().toLowerCase(),
    });
    console.log('Found user:', foundUser);

    if (!foundUser) {
      return res
        .status(401)
        .json({ message: 'Invalid Credentials - user not found' });
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return res
        .status(401)
        .json({ message: 'Invalid Credentials - password mismatch' });
    }

    const authToken = jwt.sign(
      { _id: foundUser._id, username: foundUser.username },
      process.env.TOKEN_SECRET,
      { algorithm: 'HS256', expiresIn: '6h' },
    );
    res.status(200).json({ authToken });
  } catch (error) {
    next(error);
  }
});

//verify
router.get('/auth/verify', isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

//Get user
router.get('/user', isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload._id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//PUT - image
router.put('/user', isAuthenticated, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.payload._id,
      { image: req.body.image },
      { new: true },
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
