import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="navbar">
      <div className="nav-title-group">
        <h2 className="nav-title" style={{ textTransform: 'capitalize' }}>
          Welcome, {user.username || 'Student'}!
        </h2>
      </div>
      <div className="nav-right">
        <span style={{ fontSize: '14px', color: '#64748b' }}>Student Account</span>
      </div>
    </header>
  );
};

export default Navbar;
