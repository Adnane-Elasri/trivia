// backend/checkQuestions.js
const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const counts = await Question.aggregate([
      {
        $group: {
          _id: { category: "$category", difficulty: "$difficulty" },
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('Question counts by category and difficulty:');
    console.table(counts);
    
    // Check specific category
    const genKnowledgeQuestions = await Question.find({ 
      category: 'General Knowledge',
      difficulty: 'easy'
    });
    
    console.log(`\nFound ${genKnowledgeQuestions.length} General Knowledge easy questions`);
    
    if (genKnowledgeQuestions.length > 0) {
      console.log('Sample question:');
      console.log(genKnowledgeQuestions[0]);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });