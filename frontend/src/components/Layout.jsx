import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/App.css';

const Layout = () => {
  const userString = localStorage.getItem('user');

  // Route protection: Redirect to login if user session does not exist
  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      {/* Shared Sidebar */}
      <Sidebar />

      <div className="main-content">
        {/* Shared Navbar */}
        <Navbar />

        {/* Nested Page Content Outlet */}
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
