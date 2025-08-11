import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BookingHistoryChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleColor: "#3B82F6",
        bodyColor: "#F9FAFB",
        borderColor: "#3B82F6",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `Date: ${context[0].label}`,
          label: (context) => `Amount: ₹${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          beginAtZero: true,
          callback: (value) => `₹${value.toLocaleString()}`,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const chartData = {
    labels: data.map((item) => {
      const date = new Date(item.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        data: data.map((item) => item.amount),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#1E40AF",
        pointHoverBackgroundColor: "#FFFFFF",
        pointHoverBorderColor: "#3B82F6",
        fill: true,
      },
    ],
  };

  return (
    <div className="h-80">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default BookingHistoryChart;

