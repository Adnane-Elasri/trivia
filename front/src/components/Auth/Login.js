import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Message from '../Common/Message';
import './Auth.css';

const Login = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setMessage(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <Message variant="error">{message}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <span className="auth-link" onClick={onToggleForm}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;