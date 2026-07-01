import React from 'react';

const EmptyState = ({ isFilterActive, onAddClick, onResetFilters }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center max-w-sm mx-auto shadow-xs">
      <h3 className="text-base font-bold text-slate-700">No Expenses Found</h3>
      <p className="text-sm text-slate-400 mt-2">
        {isFilterActive
          ? 'No expenses matched your current search filters. Try clearing them to see all records.'
          : 'Your expense list is empty. Log a new transaction to get started!'}
      </p>
      
      <div className="mt-4">
        {isFilterActive ? (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        ) : (
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Add First Expense
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
