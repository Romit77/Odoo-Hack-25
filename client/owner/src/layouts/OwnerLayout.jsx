import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { OwnerSidebar, AuthenticatedNavbar } from "@components/layout";

const OwnerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0d1a] text-[#e2e8f0]">
      <AuthenticatedNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <OwnerSidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto px-8 py-10 max-w-5xl mx-auto transition-all duration-300 ease-in-out ${
            isOpen ? "lg:ml-64" : "ml-0"
          } bg-[#1e293b] rounded-xl shadow-lg`}
        >
          <div className="container mx-auto px-4 py-8 rounded-xl bg-[#1e293b]">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;

