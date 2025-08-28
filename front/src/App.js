// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import GameLobby from './components/Game/GameLobby';
import Question from './components/Game/Question';
import Results from './components/Game/Results';
import Leaderboard from './components/Game/Leaderboard';
import Loading from './components/Common/Loading';
import DebugInfo from './components/Common/DebugInfo';
import api from './services/api';
import './styles/App.css';

function App() {
  const { user, loading } = useAuth();
  const [currentGame, setCurrentGame] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState('login');
  const [showDebug, setShowDebug] = useState(false);

  // Add debug hotkey
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'd') {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Function to refresh game data from server
  const refreshGameData = async () => {
    if (!currentGame?._id) return;
    
    try {
      const response = await api.get(`/games/${currentGame._id}`);
      setCurrentGame(response.data);
    } catch (error) {
      console.error('Error refreshing game data:', error);
    }
  };

  const handleAnswerSubmitted = async () => {
    await refreshGameData();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                user ? (
                  currentGame ? (
                    currentGame.isFinished ? (
                      <Results 
                        game={currentGame} 
                        onPlayAgain={() => setCurrentGame(null)} 
                      />
                    ) : (
                      <Question 
                        game={currentGame} 
                        onAnswer={handleAnswerSubmitted} 
                      />
                    )
                  ) : (
                    <GameLobby onStartGame={setCurrentGame} />
                  )
                ) : (
                  showAuthForm === 'login' ? (
                    <Login onToggleForm={() => setShowAuthForm('register')} />
                  ) : (
                    <Register onToggleForm={() => setShowAuthForm('login')} />
                  )
                )
              } 
            />
            
            <Route 
              path="/leaderboard" 
              element={user ? <Leaderboard /> : <Navigate to="/" />} 
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
        <DebugInfo game={currentGame} visible={showDebug} />
      </div>
    </Router>
  );
}

export default App;