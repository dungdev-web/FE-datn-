import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueAndVisitsChart = () => {
  const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];

  const revenueData = {
    labels,
    datasets: [{
      label: 'Doanh thu (VNĐ)',
      data: [1200000, 1500000, 1100000, 1800000, 1700000, 2000000, 2200000],
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true,
      pointBackgroundColor: 'rgba(0, 123, 255, 1)',
    }]
  };

  const visitData = {
    labels,
    datasets: [{
      label: 'Lượt truy cập',
      data: [320, 450, 380, 600, 570, 710, 800],
      backgroundColor: 'rgba(40, 167, 69, 0.5)',
      borderColor: 'rgba(40, 167, 69, 1)',
      borderWidth: 1
    }]
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            if (context.dataset.label.includes('Doanh thu')) {
              return `${context.dataset.label}: ${value.toLocaleString('vi-VN')} ₫`;
            }
            return `${context.dataset.label}: ${value.toLocaleString('vi-VN')}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (tickValue) {
            return typeof tickValue === 'number'
              ? tickValue.toLocaleString('vi-VN')
              : tickValue;
          }
        }
      }
    }
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-container">
        <h3>📊 Doanh thu theo tuần</h3>
        <Line data={revenueData} options={commonOptions} />
      </div>

      <div className="chart-container">
        <h3>📈 Lượt truy cập theo tuần</h3>
        <Bar data={visitData} options={commonOptions} />
      </div>
    </div>
  );
};

export default RevenueAndVisitsChart;
