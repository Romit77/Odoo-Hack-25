import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PeakHoursChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleColor: "#10B981",
        bodyColor: "#F9FAFB",
        borderColor: "#10B981",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `Bookings: ${context.parsed.y}`,
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
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: {
          topLeft: 6,
          topRight: 6,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const chartData = {
    labels: data.map((item) => item.hour),
    datasets: [
      {
        data: data.map((item) => item.bookings),
        backgroundColor: data.map((item, index) => {
          const intensity =
            item.bookings / Math.max(...data.map((d) => d.bookings));
          return `rgba(16, 185, 129, ${0.3 + intensity * 0.7})`;
        }),
        borderColor: data.map(() => "#10B981"),
        borderWidth: 2,
        hoverBackgroundColor: data.map(() => "rgba(16, 185, 129, 0.8)"),
        hoverBorderColor: "#059669",
        hoverBorderWidth: 3,
      },
    ],
  };

  return (
    <div className="h-64">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default PeakHoursChart;
