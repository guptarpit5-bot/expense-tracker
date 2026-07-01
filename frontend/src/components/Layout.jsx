import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/App.css';

const Layout = () => {
  const userString = localStorage.getItem('user');

  
  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">

      <Sidebar />

      <div className="main-content">
  
        <Navbar />

        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
