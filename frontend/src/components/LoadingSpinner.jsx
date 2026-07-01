import React from 'react';
import '../styles/App.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span className="spinner-text">Loading details...</span>
    </div>
  );
};

export default LoadingSpinner;
