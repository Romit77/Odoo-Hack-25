import useDashboardData from "@hooks/admin/useDashboardData";
import StatCard from "./StatCard";
import BookingHistoryChart from "./BookingHistoryChart";
import PeakHoursChart from "./PeakHoursChart";
import CourtUtilizationChart from "./CourtUtilizationChart";
import AdminDashboardSkeleton from "./AdminDashboardSkeleton";
import { motion } from "framer-motion";
import {
  Users,
  Building,
  MapPin,
  CreditCard,
  UserPlus,
  UserX,
  TrendingUp,
  Activity,
  Calendar,
  BarChart3,
  PieChart,
  DollarSign,
  Clock,
  Star,
} from "lucide-react";
import { useState } from "react";

const AdminDashboard = () => {
  const { data, loading, error } = useDashboardData();
  const [selectedTimeRange, setSelectedTimeRange] = useState("30");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen bg-dark-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 text-primary-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Activity className="w-full h-full" />
          </motion.div>
          <p className="text-dark-300 text-lg">
            Error loading dashboard data. Please try again later.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (!data) {
    return null;
  }

  const totalRevenue = data.bookingHistory.reduce((sum, day) => {
    return sum + day.amount;
  }, 0);

  // Mock data for additional charts
  const revenueByMonth = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];

  const courtUtilization = [
    { court: "Football", bookings: 234, percentage: 85 },
    { court: "Cricket", bookings: 187, percentage: 68 },
    { court: "Basketball", bookings: 156, percentage: 57 },
    { court: "Tennis", bookings: 143, percentage: 52 },
    { court: "Badminton", bookings: 198, percentage: 72 },
  ];

  const peakHours = [
    { hour: "6 AM", bookings: 12 },
    { hour: "8 AM", bookings: 34 },
    { hour: "10 AM", bookings: 68 },
    { hour: "12 PM", bookings: 95 },
    { hour: "2 PM", bookings: 87 },
    { hour: "4 PM", bookings: 142 },
    { hour: "6 PM", bookings: 198 },
    { hour: "8 PM", bookings: 156 },
    { hour: "10 PM", bookings: 73 },
  ];

  const primaryStats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      color: "primary",
      description: "Active platform users",
    },
    {
      title: "Total Owners",
      value: data.totalOwners,
      icon: Building,
      color: "accent",
      description: "Property owners registered",
    },
    {
      title: "Total Courts",
      value: data.totalTurfs,
      icon: MapPin,
      color: "primary",
      description: "Available sports courts",
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: CreditCard,
      color: "accent",
      description: "All-time reservations",
    },
  ];

  const secondaryStats = [
    {
      title: "Pending Requests",
      value: data.pendingRequests,
      icon: UserPlus,
      color: "primary",
      description: "Awaiting approval",
      priority: "high",
    },
    {
      title: "Rejected Requests",
      value: data.rejectedRequests,
      icon: UserX,
      color: "accent",
      description: "Declined applications",
      priority: "medium",
    },
    {
      title: "Total Revenue",
      value: totalRevenue,
      icon: TrendingUp,
      color: "primary",
      prefix: "₹",
      description: "Total earnings generated",
      priority: "high",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 text-dark-50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text tracking-tight mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                Admin Dashboard
              </motion.h1>
              <motion.p
                className="text-dark-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Monitor and manage your platform performance
              </motion.p>
            </div>
            <motion.div
              className="flex items-center gap-3 text-dark-400"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-sm">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </motion.div>
          </div>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          ></motion.div>
        </motion.div>

        {/* Primary Stats Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {primaryStats.map((card, idx) => (
            <motion.div
              key={card.title}
              className="group relative bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border border-dark-600/50 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: `
                  0 10px 25px -5px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(59, 130, 246, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
              }}
              variants={{
                ...cardVariants,
                hover: {
                  scale: 1.03,
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: `
                    0 25px 50px -12px rgba(59, 130, 246, 0.15),
                    0 0 0 1px rgba(59, 130, 246, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  transition: { duration: 0.3, ease: "easeOut" },
                },
              }}
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <div className="relative p-6">
                <StatCard
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                />
                <motion.p
                  className="text-dark-400 text-sm mt-2 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {card.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary Stats Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {secondaryStats.map((card, idx) => (
            <motion.div
              key={card.title}
              className={`group relative bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border backdrop-blur-sm overflow-hidden ${
                card.priority === "high"
                  ? "border-primary-500/30"
                  : "border-dark-600/50"
              }`}
              style={{
                boxShadow:
                  card.priority === "high"
                    ? `
                    0 10px 25px -5px rgba(59, 130, 246, 0.2),
                    0 0 0 1px rgba(59, 130, 246, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05)
                  `
                    : `
                    0 10px 25px -5px rgba(0, 0, 0, 0.3),
                    0 0 0 1px rgba(75, 85, 99, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05)
                  `,
              }}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  card.priority === "high"
                    ? `
                    0 25px 50px -12px rgba(59, 130, 246, 0.25),
                    0 0 0 1px rgba(59, 130, 246, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `
                    : `
                    0 25px 50px -12px rgba(16, 185, 129, 0.15),
                    0 0 0 1px rgba(16, 185, 129, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <div className="relative p-6">
                <StatCard
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  color={card.color}
                  prefix={card.prefix}
                />
                <motion.p
                  className="text-dark-400 text-sm mt-2 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {card.description}
                </motion.p>
                {card.priority === "high" && (
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-primary-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          className="grid gap-6 lg:grid-cols-2 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Booking Chart */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border border-dark-600/50 backdrop-blur-sm overflow-hidden"
            style={{
              boxShadow: `
                0 10px 25px -5px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(75, 85, 99, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
            }}
            variants={cardVariants}
          >
            <div className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 px-6 py-4 border-b border-dark-600/50 backdrop-blur-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 bg-primary-500/20 rounded-lg border border-primary-500/30"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BarChart3 className="w-6 h-6 text-primary-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-semibold text-primary-400">
                      Booking History
                    </h2>
                    <p className="text-dark-400 text-sm">
                      Track booking trends over time
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-dark-400">Time Range:</span>
                  <motion.select
                    className="bg-dark-800/80 text-dark-50 border border-primary-500/30 backdrop-blur-sm rounded-xl px-3 py-2 focus:outline-none focus:border-primary-500"
                    style={{
                      boxShadow: `
                        inset 0 2px 4px rgba(0, 0, 0, 0.2),
                        0 0 0 1px rgba(59, 130, 246, 0.1)
                      `,
                    }}
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    whileFocus={{
                      borderColor: "rgba(59, 130, 246, 0.5)",
                      boxShadow: `
                        inset 0 2px 4px rgba(0, 0, 0, 0.2),
                        0 0 0 2px rgba(59, 130, 246, 0.2)
                      `,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                  </motion.select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-dark-950/50 rounded-xl p-4 border border-dark-700/50">
                <BookingHistoryChart
                  data={data.bookingHistory.slice(-selectedTimeRange)}
                />
              </div>
            </div>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border border-dark-600/50 backdrop-blur-sm overflow-hidden"
            variants={cardVariants}
          >
            <div className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 px-6 py-4 border-b border-dark-600/50">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-accent-500/20 rounded-lg border border-accent-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <DollarSign className="w-6 h-6 text-accent-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-accent-400">
                    Monthly Revenue
                  </h3>
                  <p className="text-dark-400 text-sm">
                    Revenue trends by month
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {revenueByMonth.map((item, idx) => (
                  <motion.div
                    key={item.month}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <span className="text-dark-300 text-sm">{item.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(item.revenue / 70000) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        ></motion.div>
                      </div>
                      <span className="text-accent-400 text-sm font-medium">
                        ₹{item.revenue.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Court Utilization */}
          <motion.div
            className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border border-dark-600/50 backdrop-blur-sm overflow-hidden"
            variants={cardVariants}
          >
            <div className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 px-6 py-4 border-b border-dark-600/50">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2 bg-primary-500/20 rounded-lg border border-primary-500/30"
                  whileHover={{ scale: 1.1 }}
                >
                  <PieChart className="w-6 h-6 text-primary-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-primary-400">
                    Court Utilization
                  </h3>
                  <p className="text-dark-400 text-sm">Usage by sport type</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <CourtUtilizationChart data={courtUtilization} />
            </div>
          </motion.div>
        </motion.div>

        {/* Peak Hours Chart */}
        <motion.div
          className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl shadow-2xl border border-dark-600/50 backdrop-blur-sm overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gradient-to-r from-dark-800/80 to-dark-700/80 px-6 py-4 border-b border-dark-600/50">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-green-500/20 rounded-lg border border-green-500/30"
                whileHover={{ scale: 1.1 }}
              >
                <Clock className="w-6 h-6 text-green-400" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">
                  Peak Hours Analysis
                </h3>
                <p className="text-dark-400 text-sm">
                  Booking distribution throughout the day
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <PeakHoursChart data={peakHours} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
