// frontend/src/components/Game/Question.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import './Game.css';

const Question = ({ game, onAnswer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    console.log('Game object:', game);
    console.log('Current question index:', game?.currentQuestion);
    console.log('Total questions:', game?.questions?.length);
    
    if (game && game.questions && game.currentQuestion < game.questions.length) {
      const fetchQuestion = async () => {
        try {
          const question = game.questions[game.currentQuestion];
          console.log('Loading question:', question);
          setCurrentQuestion(question);
          setTimeLeft(15);
          setSelectedAnswer('');
          setAnswered(false);
        } catch (error) {
          console.error('Error fetching question', error);
        }
      };
      
      fetchQuestion();
    } else if (game && game.currentQuestion >= game.questions.length) {
      console.log('All questions completed');
    }
  }, [game, game?.currentQuestion]);

  // Safe answer preparation with error handling
  const allAnswers = React.useMemo(() => {
    if (!currentQuestion) return [];
    
    try {
      // Ensure incorrectAnswers is an array
      const incorrect = Array.isArray(currentQuestion.incorrectAnswers) 
        ? currentQuestion.incorrectAnswers 
        : [];
      
      return [
        currentQuestion.correctAnswer,
        ...incorrect
      ].sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error('Error preparing answers:', error);
      return [currentQuestion.correctAnswer];
    }
  }, [currentQuestion]);

  // Fixed handleAnswer function
  const handleAnswer = useCallback(async (answer) => {
    setAnswered(true);
    setSelectedAnswer(answer);
    
    try {
      // Submit the answer immediately
      await api.post(`/games/${game._id}/answer`, {
        questionId: currentQuestion._id,
        answer
      });
      
      // Wait a moment to show the correct answer, then call onAnswer
      setTimeout(() => {
        onAnswer();
      }, 1500);
    } catch (error) {
      console.error('Error submitting answer', error);
    }
  }, [game, currentQuestion, onAnswer]);

  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer('');
    }
  }, [timeLeft, answered, handleAnswer]);

  if (!currentQuestion) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading question...</p>
      </div>
    );
  }

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {game.currentQuestion + 1} of {game.questions.length}</h3>
        <div className="timer">Time left: {timeLeft}s</div>
      </div>
      
      <div className="question-content">
        <h2>{currentQuestion.question}</h2>
        
        <div className="answers">
          {allAnswers.map((answer, index) => {
            let buttonClass = 'answer-btn';
            
            if (answered) {
              if (answer === currentQuestion.correctAnswer) {
                buttonClass += ' correct';
              } else if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
                buttonClass += ' incorrect';
              }
            } else if (answer === selectedAnswer) {
              buttonClass += ' selected';
            }
            
            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => !answered && handleAnswer(answer)}
                disabled={answered}
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;