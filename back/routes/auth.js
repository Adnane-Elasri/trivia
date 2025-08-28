const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({
      username,
      email,
      password
    });
    
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (user && (await user.correctPassword(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        score: user.score,
        gamesPlayed: user.gamesPlayed,
        wins: user.wins,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      score: user.score,
      gamesPlayed: user.gamesPlayed,
      wins: user.wins
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;