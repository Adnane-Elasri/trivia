const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check total questions
    const totalQuestions = await Question.countDocuments();
    console.log(`Total questions in database: ${totalQuestions}`);
    
    if (totalQuestions === 0) {
      console.log('No questions found in database! Run: node seed.js');
      process.exit(1);
    }
    
    // Check questions by category and difficulty
    const categories = await Question.distinct('category');
    console.log('\nAvailable categories:', categories);
    
    for (const category of categories) {
      for (const difficulty of ['easy', 'medium', 'hard']) {
        const count = await Question.countDocuments({ category, difficulty });
        console.log(`${category} - ${difficulty}: ${count} questions`);
      }
    }
    
    // Show sample questions
    console.log('\nSample questions:');
    const sampleQuestions = await Question.find().limit(3);
    sampleQuestions.forEach((q, i) => {
      console.log(`\nQuestion ${i + 1}:`);
      console.log(`- Category: ${q.category}`);
      console.log(`- Difficulty: ${q.difficulty}`);
      console.log(`- Question: ${q.question}`);
      console.log(`- Correct: ${q.correctAnswer}`);
      console.log(`- Incorrect: ${q.incorrectAnswers.join(', ')}`);
    });
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });