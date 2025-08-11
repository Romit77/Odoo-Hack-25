import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, MapPin, Star, Calendar, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

const OwnerSidebar = ({ isOpen, toggleSidebar, className }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/owner/dashboard" },
    { name: "Bookings", path: "/owner/bookings" },
    { name: "Turf Management", path: "/owner/turf-management" },
    { name: "Reviews", path: "/owner/review" },
  ];

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: isOpen ? 0 : -260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`${className} w-60 bg-[#1e293b] border-r border-[#6366f1] min-h-screen py-8 px-6 flex flex-col shadow-xl`}
    >
      <div className="mb-10 text-2xl font-bold text-[#e2e8f0] tracking-tight">
        Owner Panel
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-[#e2e8f0] hover:bg-[#6366f1] hover:text-white transition-colors font-medium ${
                  location.pathname === item.path
                    ? "bg-[#6366f1] text-white"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default OwnerSidebar;
