import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register necessary elements and scales
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
function MonthlySpendingChart({ transactions }) {
  // Group transactions by month
  const monthlyTotals = transactions.reduce((totals, transaction) => {
    const month = dayjs(transaction.datetime).format('YYYY-MM');
    if (!totals[month]) totals[month] = 0;
    totals[month] += transaction.price;
    return totals;
  }, {});

  const months = Object.keys(monthlyTotals).sort();
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Spending',
        data: months.map(month => monthlyTotals[month]),
        fill: false,
        borderColor: '#4BC0C0',
      },
    ],
  };

  return <Line data={data} />;
}

export default MonthlySpendingChart;
