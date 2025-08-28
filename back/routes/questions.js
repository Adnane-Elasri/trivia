// backend/routes/questions.js
const express = require('express');
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get questions by category and difficulty
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, limit } = req.query;
    
    // Build query object
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
    
    // Get random questions that match the criteria
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(limit) || 10 } }
    ]);
    
    if (questions.length === 0) {
      return res.status(404).json({ 
        message: 'No questions found with the specified criteria' 
      });
    }
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add a new question (admin functionality)
router.post('/', protect, async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;