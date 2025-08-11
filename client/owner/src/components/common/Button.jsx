import { motion } from "framer-motion";
const Button = ({ children, loading, className = "", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className={`bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-[#e2e8f0] px-5 py-2.5 rounded-lg shadow-md hover:from-[#4f46e5] hover:to-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition font-semibold relative ${className}`}
    disabled={loading}
    {...props}
  >
    {loading ? (
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="animate-spin h-5 w-5 border-2 border-[#e2e8f0] border-t-[#6366f1] rounded-full"></span>
      </span>
    ) : null}
    <span className={loading ? "invisible" : ""}>{children}</span>
  </motion.button>
);

export default Button;

