import React from 'react';
import { FiDollarSign, FiList, FiTrendingUp, FiClock } from 'react-icons/fi';

const StatsCards = ({ expenses = [] }) => {
  // Format to standard dollar format
  const formatAmount = (val) => {
    return '$' + val.toFixed(2);
  };

  // Basic calculations
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const count = expenses.length;

  let highest = { amount: 0, title: 'None' };
  if (expenses.length > 0) {
    const highestItem = expenses.reduce((max, item) => (item.amount > max.amount ? item : max), expenses[0]);
    highest = { amount: highestItem.amount, title: highestItem.title };
  }

  let latest = { amount: 0, title: 'None' };
  if (expenses.length > 0) {
    const sorted = [...expenses].sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));
    latest = { amount: sorted[0].amount, title: sorted[0].title };
  }

  const cards = [
    {
      label: 'Total Expenses',
      value: formatAmount(total),
      subtext: 'Sum of all records',
      icon: FiDollarSign,
      color: 'border-l-4 border-l-blue-600',
    },
    {
      label: 'Total Transactions',
      value: count.toString(),
      subtext: 'Number of logs',
      icon: FiList,
      color: 'border-l-4 border-l-green-600',
    },
    {
      label: 'Highest Expense',
      value: formatAmount(highest.amount),
      subtext: highest.title,
      icon: FiTrendingUp,
      color: 'border-l-4 border-l-red-600',
    },
    {
      label: 'Latest Expense',
      value: formatAmount(latest.amount),
      subtext: latest.title,
      icon: FiClock,
      color: 'border-l-4 border-l-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className={`bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between ${card.color}`}>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.label}</p>
              <h3 className="text-xl font-bold text-slate-800 mt-1">{card.value}</h3>
              <p className="text-xs text-slate-400 mt-1 truncate max-w-[150px]">{card.subtext}</p>
            </div>
            <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
