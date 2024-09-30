"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import TransactionChart from '../components/TransactionChart';

export default function Home() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    if (session) {
      fetch('/api/transactions/get')
        .then((res) => res.json())
        .then((data) => setTransactions(data));

      fetch('/api/transactions/summary')
        .then((res) => res.json())
        .then((data) => setSummary(data));
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 mb-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
        <nav className="mt-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/add" className="text-blue-600 hover:text-blue-800">Add Transaction</Link>
            </li>
            <li>
              <Link href="/get" className="text-blue-600 hover:text-blue-800">Get Transactions</Link>
            </li>
            <li>
              <Link href="/summary" className="text-blue-600 hover:text-blue-800">View Summary</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome, {session?.user?.name}
        </h2>
        <div className="flex justify-between mb-6">
          <div className="text-lg font-medium text-green-600">
            Income: ${summary.income}
          </div>
          <div className="text-lg font-medium text-red-600">
            Expense: ${summary.expense}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <TransactionChart data={transactions} />
        </div>
      </main>
    </div>
  );
}
