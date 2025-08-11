import { motion } from "framer-motion";

const Bookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[#1e293b] min-h-screen px-4 py-10 text-[#e2e8f0]"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-[#e2e8f0] text-center tracking-tight">
          Bookings
        </h1>
        <div className="bg-[#0a0d1a] rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Upcoming Bookings</h2>
          <ul className="space-y-4">
            <li className="border-b border-[#6366f1] pb-2">
              Turf A - 12 Aug, 10:00 AM
            </li>
            <li className="border-b border-[#6366f1] pb-2">
              Turf B - 13 Aug, 2:00 PM
            </li>
            <li className="border-b border-[#6366f1] pb-2">
              Turf C - 14 Aug, 5:00 PM
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Bookings;

