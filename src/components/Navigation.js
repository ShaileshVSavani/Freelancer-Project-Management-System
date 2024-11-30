
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); 
  // Toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white text-gray-800 p-4 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Logo Section */}
      <NavLink to="/">
        <img
          className="w-32 h-auto"
          src="https://s3.amazonaws.com/fjds/gig_company/original/20/freelancer-logo.png?1587072521"
          alt="logo"
        />
      </NavLink>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`lg:flex space-x-6 ${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 text-center bg-white shadow-md lg:static lg:flex-row lg:space-x-6 lg:bg-transparent lg:shadow-none transition-all duration-300 z-50`}
      >
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold transition-all duration-300"
              : "text-gray-800 hover:text-blue-500 hover:transition-all duration-300"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/add-project"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold transition-all duration-300"
              : "text-gray-800 hover:text-blue-500 hover:transition-all duration-300"
          }
        >
          Add Project
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold transition-all duration-300"
              : "text-gray-800 hover:text-blue-500 hover:transition-all duration-300"
          }
        >
          Payments
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
