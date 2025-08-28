import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Game.css';

const Results = ({ game, onPlayAgain }) => {
  const { user } = useAuth();
  
  if (!game || !game.isFinished) {
    return <div>Loading results...</div>;
  }

  const currentPlayer = game.players.find(p => p.user._id === user._id);
  const isWinner = game.winner && game.winner._id === user._id;

  return (
    <div className="results-container">
      <h2>Game Results</h2>
      
      <div className={`result-message ${isWinner ? 'win' : 'lose'}`}>
        {isWinner ? 'Congratulations! You won!' : 'Game over! Better luck next time!'}
      </div>
      
      <div className="score-card">
        <h3>Your Score: {currentPlayer.score}</h3>
        <p>Correct answers: {currentPlayer.answers.filter(a => a.isCorrect).length}</p>
        <p>Total questions: {game.questions.length}</p>
      </div>
      
      <div className="answers-review">
        <h3>Answer Review</h3>
        {game.questions.map((question, index) => {
          const playerAnswer = currentPlayer.answers[index];
          return (
            <div key={index} className="answer-item">
              <p><strong>Q{index + 1}:</strong> {question.question}</p>
              <p className={playerAnswer.isCorrect ? 'correct' : 'incorrect'}>
                Your answer: {playerAnswer.answer} 
                {playerAnswer.isCorrect ? ' ✓' : ' ✗'}
              </p>
              {!playerAnswer.isCorrect && (
                <p className="correct-answer">Correct answer: {question.correctAnswer}</p>
              )}
            </div>
          );
        })}
      </div>
      
      <button className="play-again-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Results;