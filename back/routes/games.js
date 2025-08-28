const express = require('express');
const Game = require('../models/Game');
const User = require('../models/User');
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create a new game
router.post('/', protect, async (req, res) => {
  try {
    const { questions } = req.body;
    
    // Populate the questions to ensure they exist
    const questionDetails = await Question.find({ _id: { $in: questions } });
    
    if (questionDetails.length !== questions.length) {
      return res.status(400).json({ 
        message: 'Some questions could not be found. Please try again.' 
      });
    }
    
    const game = await Game.create({
      players: [{ user: req.user._id, score: 0, answers: [] }],
      questions
    });
    
    // Populate the game with question details before sending response
    const populatedGame = await Game.findById(game._id)
      .populate('questions')
      .populate('players.user', 'username');
    
    res.status(201).json(populatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a game by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('players.user', 'username')
      .populate('questions')
      .populate('winner', 'username');
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit an answer
router.post('/:id/answer', protect, async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const game = await Game.findById(req.params.id).populate('questions');
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    const currentQuestion = game.questions[game.currentQuestion];
    const isCorrect = currentQuestion.correctAnswer === answer;
    
    const playerIndex = game.players.findIndex(
      player => player.user.toString() === req.user._id.toString()
    );
    
    if (playerIndex === -1) {
      return res.status(404).json({ message: 'Player not found in this game' });
    }
    
    game.players[playerIndex].answers.push({
      question: questionId,
      answer,
      isCorrect
    });
    
    if (isCorrect) {
      game.players[playerIndex].score += 
        currentQuestion.difficulty === 'easy' ? 1 : 
        currentQuestion.difficulty === 'medium' ? 2 : 3;
    }
    
    game.currentQuestion += 1;
    
    if (game.currentQuestion >= game.questions.length) {
      game.isFinished = true;
      
      // Determine winner
      let maxScore = -1;
      let winnerId = null;
      
      game.players.forEach(player => {
        if (player.score > maxScore) {
          maxScore = player.score;
          winnerId = player.user;
        }
      });
      
      game.winner = winnerId;
      
      // Update user stats
      await User.updateMany(
        { _id: { $in: game.players.map(p => p.user) } },
        { $inc: { gamesPlayed: 1 } }
      );
      
      if (winnerId) {
        await User.findByIdAndUpdate(winnerId, { $inc: { wins: 1, score: maxScore } });
      }
    }
    
    await game.save();
    
    // Populate the updated game before sending response
    const populatedGame = await Game.findById(game._id)
      .populate('questions')
      .populate('players.user', 'username');
    
    res.json(populatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;