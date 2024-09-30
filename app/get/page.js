"use client";
import { useEffect, useState } from 'react';

export default function GetTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/transactions/get')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Transaction List</h2>
        {error && <p className="text-red-600">{error}</p>}
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="border-b pb-2">
              {new Date(transaction.date).toLocaleDateString()}: <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>${transaction.amount}</span> ({transaction.type}) - {transaction.note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
