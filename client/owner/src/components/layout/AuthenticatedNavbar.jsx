import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import ThemeSwitcher from "../common/ThemeSwitcher.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/slices/authSlice.js";
import { motion } from "framer-motion";

const AuthenticatedNavbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state?.auth?.role);
  const path = role === "admin" ? "/admin" : "/owner";
  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="navbar fixed top-0 z-50 shadow-md bg-[#1e293b] text-[#e2e8f0]"
    >
      <div className="navbar-start">
        <button className="btn btn-ghost lg:hidden" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link
          to={path}
          className="btn btn-ghost normal-case text-xl max-sm:p-0 flex items-center gap-2"
        >
          <img
            src="/logo.png"
            alt="TurfSpot"
            className="h-10 w-10 rounded-lg shadow-md"
          />
          <span className="font-bold tracking-wide">TurfSpot</span>
        </Link>
      </div>
      <div className="navbar-end flex items-center gap-4">
        <ThemeSwitcher />
        <button
          className="bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-[#e2e8f0] px-4 py-2 rounded-lg font-semibold shadow hover:from-[#4f46e5] hover:to-[#6366f1] transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default AuthenticatedNavbar;

