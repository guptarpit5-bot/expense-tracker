import React, { useState, useEffect } from 'react';
import { FiList, FiAlertCircle } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import '../styles/Dashboard.css';
import '../styles/App.css';

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    
    const response = await fetch(`http://${API}/api/expenses`, {
      method: 'GET',
      headers: {
        'x-user-id': user.id,
      },
    });

    const resData = await response.json();

    if (response.ok) {
      
      let totalAmount = 0;
      for (let i = 0; i < resData.data.length; i++) {
        totalAmount += resData.data[i].amount;
      }
      
      setStats({
        total: totalAmount,
        count: resData.data.length,
      });
    } else {
      setError(resData.message || 'Failed to fetch dashboard data.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
     
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-subtitle">Summary of your financial ledger</p>
      </div>

      {error && (
        <div className="auth-error" style={{ marginBottom: '20px' }}>
          <FiAlertCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="spinner-container card">
          <div className="spinner"></div>
          <span className="spinner-text">Syncing dashboard ledger...</span>
        </div>
      ) : (
        <>

         
          <div className="dashboard-grid">
            <div className="stat-card blue">
              <div className="stat-info">
                <span className="stat-label">Total Expenses</span>
                <span className="stat-value">₹{stats.total.toFixed(2)}</span>
                <span className="stat-desc">Sum of recorded outlays</span>
              </div>
              <div className="stat-icon-box">
                <FaRupeeSign style={{ fontSize: '20px' }} />
              </div>
            </div>

           
            <div className="stat-card green">
              <div className="stat-info">
                <span className="stat-label">Total Transactions</span>
                <span className="stat-value">{stats.count}</span>
                <span className="stat-desc">Count of logged entries</span>
          </div>
              <div className="stat-icon-box">
                <FiList style={{ fontSize: '20px' }} />
              </div>
            </div>
    </div>
      </>
    )}
  </div>
  );
};

export default Dashboard;
