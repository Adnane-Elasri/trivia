const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    score: {
      type: Number,
      default: 0
    },
    answers: [{
      question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
      },
      answer: String,
      isCorrect: Boolean
    }]
  }],
  questions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Question'
  }],
  currentQuestion: {
    type: Number,
    default: 0
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);