import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register elements
ChartJS.register(ArcElement, Tooltip, Legend);
function CategoryChart({ transactions }) {
  const categories = ['Food', 'Rent', 'Entertainment', 'Utilities', 'Other'];
  const categoryTotals = categories.map(cat =>
    transactions
      .filter(transaction => transaction.category === cat)
      .reduce((sum, transaction) => sum + transaction.price, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryTotals,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return <Pie data={data} />;
}

export default CategoryChart;
