import React, { useState } from 'react';
import api from '../../services/api';
import './Game.css';

const GameLobby = ({ onStartGame }) => {
  const [categories] = useState([
    'General Knowledge', 'Science', 'History', 'Geography', 
    'Entertainment', 'Sports', 'Art', 'Technology'
  ]);
  const [difficulties] = useState(['easy', 'medium', 'hard']);
  const [selectedCategory, setSelectedCategory] = useState('General Knowledge');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartGame = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Requesting questions with params:', {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        limit: questionCount
      });
      
      // Get questions from backend
      const response = await api.get('/questions', {
        params: {
          category: selectedCategory,
          difficulty: selectedDifficulty,
          limit: questionCount
        }
      });
      
      console.log('Received questions:', response.data);
      
      // Check if we got the right number of questions
      if (response.data.length !== questionCount) {
        setError(`Could only find ${response.data.length} questions. Please try a different category or difficulty.`);
        setLoading(false);
        return;
      }
      
      // Create a new game with ALL questions
      const gameResponse = await api.post('/games', {
        questions: response.data.map(q => q._id)
      });
      
      console.log('Game created:', gameResponse.data);
      onStartGame(gameResponse.data);
    } catch (error) {
      console.error('Error starting game', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError('Failed to start game: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-lobby">
      <h2>Game Lobby</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="game-settings">
        <div className="setting">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="setting">
          <label>Difficulty:</label>
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="setting">
          <label>Number of Questions:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <button 
        className="start-game-btn" 
        onClick={handleStartGame}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Start Game'}
      </button>
      
      <div className="debug-tips">
        <h4>Debug Tips:</h4>
        <ul>
          <li>Check browser console for detailed logs (F12)</li>
          <li>Press Ctrl+D to toggle debug information</li>
          <li>Try different categories if one doesn't work</li>
        </ul>
      </div>
    </div>
  );
};

export default GameLobby;