// frontend/src/components/Common/DebugInfo.js
import React from 'react';
import './DebugInfo.css';

const DebugInfo = ({ game, visible = false }) => {
  if (!visible) return null;
  
  return (
    <div className="debug-info">
      <h3>Debug Information</h3>
      <div className="debug-section">
        <strong>Game State:</strong>
        <pre>{JSON.stringify({
          gameId: game?._id,
          currentQuestion: game?.currentQuestion,
          totalQuestions: game?.questions?.length,
          isFinished: game?.isFinished,
          players: game?.players?.length
        }, null, 2)}</pre>
      </div>
      
      <div className="debug-section">
        <strong>Current Question:</strong>
        <pre>{JSON.stringify(game?.questions[game?.currentQuestion], null, 2)}</pre>
      </div>
    </div>
  );
};

export default DebugInfo;