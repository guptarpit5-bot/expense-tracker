import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      {/* Sidebar Logo Header */}
      <div className="sidebar-logo">
        <span style={{ fontSize: '24px', marginRight: '8px' }}>💰</span>
        <span className="logo-text">Expense App</span>
      </div>

      {/* Navigation menu list using simple emojis */}
      <nav className="sidebar-menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <span>💸</span>
          <span>Expenses</span>
        </NavLink>

        <button onClick={handleLogout} className="menu-item" style={{ marginTop: 'auto', border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </nav>

      {/* Footer User Info */}
      <div className="sidebar-footer">
        <span style={{ marginRight: '8px' }}>👤</span>
        <span style={{ textTransform: 'capitalize' }}>{user.username || 'User'}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
