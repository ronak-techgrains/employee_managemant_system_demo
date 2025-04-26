import type React from "react"
import { Users, Calendar, FileText, Clock } from "react-feather"
import { Link } from "react-router-dom"

const Dashboard: React.FC = () => {
  // Sample data for dashboard
  const stats = [
    {
      id: 1,
      title: "Total Employees",
      value: 48,
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      link: "/employees",
    },
    {
      id: 2,
      title: "Present Today",
      value: 42,
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      link: "/attendance",
    },
    { id: 3, title: "On Leave", value: 6, icon: <FileText className="h-8 w-8 text-emerald-600" />, link: "/leave" },
    {
      id: 4,
      title: "Pending Requests",
      value: 3,
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      link: "/leave",
    },
  ]

  // Sample data for recent leave applications
  const recentLeaves = [
    {
      id: 1,
      name: "John Doe",
      department: "Engineering",
      type: "Sick Leave",
      from: "2025-04-20",
      to: "2025-04-22",
      status: "Approved",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Marketing",
      type: "Vacation",
      from: "2025-04-25",
      to: "2025-04-30",
      status: "Pending",
    },
    {
      id: 3,
      name: "Robert Johnson",
      department: "Finance",
      type: "Personal",
      from: "2025-05-01",
      to: "2025-05-02",
      status: "Pending",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            to={stat.link}
            key={stat.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Leave Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentLeaves.map((leave) => (
                  <tr key={leave.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{leave.name}</div>
                      <div className="text-sm text-gray-500">{leave.department}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{leave.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {leave.from} to {leave.to}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : leave.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Today's Attendance Overview</h2>
          <div className="flex items-center justify-center h-64">
            <div className="w-64 h-64 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="25.12"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">87.5%</span>
                <span className="text-sm text-gray-600">Present</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-xl font-bold text-emerald-600">42</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-xl font-bold text-red-600">6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
