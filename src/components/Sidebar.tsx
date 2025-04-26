import type React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, Users, FileText, Home, Clock } from "react-feather";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-emerald-600">EMS</h1>
        <p className="text-gray-600 text-sm">Employee Management System</p>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600"
                : ""
            }`
          }
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600"
                : ""
            }`
          }
        >
          <Calendar className="h-5 w-5 mr-3" />
          Attendance
        </NavLink>
        <NavLink
          to="/leave"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600"
                : ""
            }`
          }
        >
          <FileText className="h-5 w-5 mr-3" />
          Leave Management
        </NavLink>
        <NavLink
          to="/team-calendar"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600"
                : ""
            }`
          }
        >
          <Clock className="h-5 w-5 mr-3" />
          Team Calendar
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
              isActive
                ? "bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600"
                : ""
            }`
          }
        >
          <Users className="h-5 w-5 mr-3" />
          Employee Details
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
