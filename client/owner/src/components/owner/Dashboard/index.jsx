import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1e293b] min-h-screen px-4 py-10 text-[#e2e8f0]"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-[#e2e8f0] text-center tracking-tight">
          Owner Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl p-6 shadow-lg"
          >
            <div className="text-lg font-semibold mb-2">Total Turfs</div>
            <div className="text-3xl font-bold">12</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl p-6 shadow-lg"
          >
            <div className="text-lg font-semibold mb-2">Bookings</div>
            <div className="text-3xl font-bold">120</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl p-6 shadow-lg"
          >
            <div className="text-lg font-semibold mb-2">Revenue</div>
            <div className="text-3xl font-bold">₹50,000</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl p-6 shadow-lg"
          >
            <div className="text-lg font-semibold mb-2">Reviews</div>
            <div className="text-3xl font-bold">4.8/5</div>
          </motion.div>
        </div>
        <div className="bg-[#0a0d1a] rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="border-b border-[#6366f1] pb-2">
              New booking for Turf A
            </li>
            <li className="border-b border-[#6366f1] pb-2">
              Review received for Turf B
            </li>
            <li className="border-b border-[#6366f1] pb-2">Turf C updated</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

