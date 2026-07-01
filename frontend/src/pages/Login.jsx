import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const API = import.meta.env.VITE_API_URL;

const Login = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    
    const response = await fetch(`https://${API}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase().trim(),
        password: password,
      }),
    });

    const resData = await response.json();

   
    if (response.ok) {
      
      localStorage.setItem('user', JSON.stringify(resData.data));
      
      navigate('/dashboard');
    } else {
      setError(resData.message || 'Login failed.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
     
        <div className="auth-header">
          <span style={{ fontSize: '36px' }}>💰🤑</span>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Log in to manage your budget</p>
        </div>

        
        {error && (
          <div className="auth-error" style={{ marginBottom: '16px' }}>
            <span>⚠️ {error}</span>
          </div>
        )}

        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>

        
        <p className="auth-link-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
