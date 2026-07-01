import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import '../styles/App.css';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const isSuccess = type === 'success';

  return (
    <div className="toast-container">
      <div className={`toast ${isSuccess ? 'success' : 'error'}`}>
        <div>
          {isSuccess ? (
            <FiCheckCircle style={{ display: 'block', fontSize: '18px' }} />
          ) : (
            <FiXCircle style={{ display: 'block', fontSize: '18px' }} />
          )}
        </div>
        <span className="toast-message">{message}</span>
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'inherit',
            display: 'flex',
            padding: '2px'
          }}
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default Toast;
