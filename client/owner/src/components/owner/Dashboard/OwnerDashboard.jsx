import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CountUp from "react-countup";
import useOwnerDashboard from "@hooks/owner/useOwnerDashboard";
import DashboardSkeleton from "./DashboardSkeleton";

const OwnerDashboard = () => {
  const { dashboardData, loading, error } = useOwnerDashboard();

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  const {
    totalBookings,
    totalReviews,
    totalRevenue,
    totalTurfs,
    bookingsPerTurf,
    revenueOverTime,
  } = dashboardData;

  // Prepare data for Revenue Over Time chart
  const revenueChartData = revenueOverTime.map((item) => ({
    date: new Date(item._id).toLocaleDateString(),
    revenue: item.revenue,
  }));

  return (
    <div className="bg-white min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <StatCard title="Total Bookings" value={totalBookings} icon="📅" />
          <StatCard title="Total Reviews" value={totalReviews} icon="⭐" />
          <StatCard
            title="Total Revenue"
            value={totalRevenue}
            icon="💰"
            prefix="₹"
          />
          <StatCard title="Total Turfs" value={totalTurfs} icon="🏟️" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Revenue Over Time">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Bookings Per Turf">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingsPerTurf}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#2563eb" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, prefix = "" }) => (
  <div className="bg-base-100 p-4 rounded-lg shadow-lg">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-3xl font-bold mt-2">
      {prefix}
      <CountUp end={value || 0} duration={2.5} separator="," />
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-base-100 p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default OwnerDashboard;
