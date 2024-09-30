"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,     
  LinearScale,      
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TransactionChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Income',
        data: data.filter((item) => item.type === 'income').map((item) => item.amount),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Expense',
        data: data.filter((item) => item.type === 'expense').map((item) => item.amount),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
}
