import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <h1>Trivia Battle</h1>
        
        {user && (
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <span>Score: {user.score}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;