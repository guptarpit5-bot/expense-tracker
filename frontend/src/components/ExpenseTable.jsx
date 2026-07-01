import React from 'react';
import '../styles/ExpenseTable.css';

const ExpenseTable = ({ expenses = [], onEditClick, onDeleteClick }) => {
  return (
    <div className="table-card">
      <div className="table-card-header">
        <h3 className="table-card-title">All Logged Expenses</h3>
      </div>
      
      <div className="table-container">
        {expenses.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
            <p>No transactions logged yet.</p>
          </div>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 'bold' }}>{item.title}</td>
                  <td>
                    <span className="badge other">{item.category}</span>
                  </td>
                  <td>₹{item.amount.toFixed(2)}</td>
                  <td>{item.expenseDate.substring(0, 10)}</td>
                  <td>{item.description || 'N/A'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => onEditClick(item)}
                        className="action-btn edit"
                        style={{ border: '1px solid #3b82f6', background: 'none', color: '#3b82f6', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteClick(item)}
                        className="action-btn delete"
                        style={{ border: '1px solid #ef4444', background: 'none', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;
