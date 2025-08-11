import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourtUtilizationChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(59, 130, 246, 0.3)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} bookings (${percentage}%)`;
          },
        },
      },
    },
    cutout: "60%",
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: "#1F2937",
      },
    },
  };

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const chartData = {
    labels: data.map((item) => item.court),
    datasets: [
      {
        data: data.map((item) => item.bookings),
        backgroundColor: colors.slice(0, data.length),
        borderColor: colors.slice(0, data.length).map((color) => color + "80"),
        borderWidth: 2,
        hoverBackgroundColor: colors
          .slice(0, data.length)
          .map((color) => color + "CC"),
        hoverBorderWidth: 3,
      },
    ],
  };

  return (
    <div className="h-64">
      <Doughnut options={options} data={chartData} />
    </div>
  );
};

export default CourtUtilizationChart;
