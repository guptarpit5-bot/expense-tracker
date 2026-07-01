import React, { useState, useEffect } from 'react';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseFormModal from '../components/ExpenseFormModal';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';
import '../styles/App.css';
import '../styles/ExpenseForm.css';

const API_BASE_URL = 'http://localhost:5000/api/expenses';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);


  const fetchExpenses = async () => {
    setLoading(true);
    setError('');
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'x-user-id': user.id, // Custom auth header
      },
    });

    const resData = await response.json();

    if (response.ok) {
      setExpenses(resData.data);
    } else {
      setError(resData.message || 'Failed to load expenses.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  
  const handleFormSubmit = async (formData) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const url = expenseToEdit ? `${API_BASE_URL}/${expenseToEdit.id}` : API_BASE_URL;
    const method = expenseToEdit ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id, // Auth header
      },
      body: JSON.stringify(formData),
    });

    const resData = await response.json();

    if (response.ok) {
      alert(expenseToEdit ? 'Expense updated successfully!' : 'Expense logged successfully!');
      fetchExpenses();
    } else {
      alert(resData.message || 'Failed to save transaction details.');
    }
  };

  
  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'x-user-id': user.id,
      },
    });

    const resData = await response.json();

    if (response.ok) {
      alert('Expense record deleted successfully.');
      fetchExpenses();
    } else {
      alert(resData.message || 'Failed to delete transaction.');
    }
  };

  return (
    <div>
      
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-title">Manage Expenses</h1>
          <p className="page-subtitle">Add, view, edit or delete your financial transactions</p>
        </div>
        <button
          onClick={() => {
            setExpenseToEdit(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary"
        >
          <FiPlus />
          <span>Add Expense</span>
        </button>
      </div>

      {error && (
        <div className="auth-error" style={{ marginBottom: '20px' }}>
          <FiAlertCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="expenses-content">
        {loading ? (
          <div className="spinner-container card">
            <div className="spinner"></div>
            <span className="spinner-text">Loading transaction records...</span>
          </div>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onEditClick={(item) => {
              setExpenseToEdit(item);
              setIsFormOpen(true);
            }}
            onDeleteClick={(item) => {
              handleDelete(item.id);
            }}
          />
        )}
      </div>

 
      <ExpenseFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setExpenseToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
};

export default ExpensesPage;
