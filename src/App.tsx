import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import AttendanceCalendar from "./pages/AttendanceCalendar"
import LeaveManagement from "./pages/LeaveManagement"
import EmployeeDetails from "./pages/EmployeeDetails"
import TeamCalendar from "./pages/TeamCalendar"
import "./index.css"

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<AttendanceCalendar />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/employees" element={<EmployeeDetails />} />
            <Route path="/team-calendar" element={<TeamCalendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
