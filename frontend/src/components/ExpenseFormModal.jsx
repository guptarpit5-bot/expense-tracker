import React, { useState, useEffect } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseFormModal = ({ isOpen, onClose, onSubmit, expenseToEdit = null }) => {

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title || '');
      setAmount(expenseToEdit.amount !== undefined ? expenseToEdit.amount.toString() : '');
      setCategory(expenseToEdit.category || '');
      setExpenseDate(expenseToEdit.expenseDate ? expenseToEdit.expenseDate.substring(0, 10) : '');
      setDescription(expenseToEdit.description || '');
    } else {
   
      setTitle('');
      setAmount('');
      setCategory('');
      setExpenseDate(new Date().toISOString().substring(0, 10)); // today's date
      setDescription('');
    }
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!title || !amount || !category || !expenseDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Amount must be a number greater than zero.');
      return;
    }

    onSubmit({
      title: title.trim(),
      amount: parsedAmount,
      category: category,
      expenseDate: new Date(expenseDate).toISOString(),
      description: description.trim() || null,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {expenseToEdit ? 'Edit Expense' : 'Add Expense'}
          </h3>
          <button onClick={onClose} className="modal-close-btn" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Books"
                className="form-input"
                required
              />
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="form-label">Amount (₹) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="form-input"
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

        
            <div className="form-group">
              <label className="form-label">Expense Date *</label>
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details..."
                className="form-input"
                style={{ resize: 'none', height: '60px' }}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
