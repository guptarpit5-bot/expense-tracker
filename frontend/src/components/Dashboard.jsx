import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StatsCards from './StatsCards';
import ExpenseTable from './ExpenseTable';
import ExpenseFormModal, { PREDEFINED_CATEGORIES } from './ExpenseFormModal';
import Toast from './Toast';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import { FiAlertTriangle } from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL;
const API_BASE_URL = `http://${API}/api/expenses`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Toast status alert state
  const [toast, setToast] = useState(null);

  // Show status toast alert helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch expenses from Backend
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      // Build query string params
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter) params.category = categoryFilter;

      const res = await axios.get(API_BASE_URL, { params });
      if (res.data?.success) {
        setExpenses(res.data.data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading expense data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reload when search or filter change
  useEffect(() => {
    fetchExpenses();
  }, [searchTerm, categoryFilter]);

  // Create or Edit form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (expenseToEdit) {
        // Edit expense
        const res = await axios.put(`${API_BASE_URL}/${expenseToEdit.id}`, formData);
        if (res.data?.success) {
          showToast('Expense updated successfully!');
          fetchExpenses();
        }
      } else {
        // Add new expense
        const res = await axios.post(API_BASE_URL, formData);
        if (res.data?.success) {
          showToast('Expense added successfully!');
          fetchExpenses();
        }
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to save expense.', 'error');
      throw err; // throw back to form modal to handle error loading state
    }
  };

  // Delete confirm handler
  const handleDeleteConfirm = async () => {
    if (!expenseToDelete) return;
    try {
      const res = await axios.delete(`${API_BASE_URL}/${expenseToDelete.id}`);
      if (res.data?.success) {
        showToast('Expense deleted successfully!');
        setExpenseToDelete(null);
        fetchExpenses();
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to delete expense.', 'error');
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content body */}
      <div className="flex-1 flex flex-col">
        <Navbar
          onAddClick={() => {
            setExpenseToEdit(null);
            setIsFormOpen(true);
          }}
        />

        {/* Dashboard inner details */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Expense Tracker Dashboard</h2>
            <p className="text-xs text-slate-500">Track and monitor your everyday spendings</p>
          </div>

          {/* Cards Panel */}
          <StatsCards expenses={expenses} />

          {/* Table display */}
          {activeTab === 'dashboard' || activeTab === 'expenses' ? (
            <div>
              {loading ? (
                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs">
                  <LoadingSpinner />
                </div>
              ) : expenses.length === 0 ? (
                <EmptyState
                  isFilterActive={!!(searchTerm || categoryFilter)}
                  onAddClick={() => {
                    setExpenseToEdit(null);
                    setIsFormOpen(true);
                  }}
                  onResetFilters={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                  }}
                />
              ) : (
                <ExpenseTable
                  expenses={expenses}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  categories={PREDEFINED_CATEGORIES}
                  onEditClick={(expense) => {
                    setExpenseToEdit(expense);
                    setIsFormOpen(true);
                  }}
                  onDeleteClick={(expense) => {
                    setExpenseToDelete(expense);
                  }}
                />
              )}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-500">
              Other tabs like "{activeTab}" are currently under construction!
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      <ExpenseFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setExpenseToEdit(null);
        }}
        onSubmit={handleFormSubmit}
        expenseToEdit={expenseToEdit}
      />

      {/* Delete Confirmation Modal */}
      {expenseToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setExpenseToDelete(null)}></div>
          <div className="bg-white rounded-xl max-w-sm w-full p-6 relative z-10 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                <FiAlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Confirm Deletion</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Are you sure you want to delete <strong className="text-slate-700">"{expenseToDelete.title}"</strong>? This will remove the record permanently.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setExpenseToDelete(null)}
                className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts Alerts */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
