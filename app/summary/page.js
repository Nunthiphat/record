"use client";
import { useEffect, useState } from 'react';

export default function Summary() {
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    fetch('/api/transactions/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-green-600">Income: ${summary.income}</h3>
          <h3 className="text-lg font-medium text-red-600">Expense: ${summary.expense}</h3>
        </div>
      </div>
    </div>
  );
}
