"use client";

import type React from "react";
import { useState } from "react";
import { Calendar, Check } from "react-feather";

interface LeaveApplication {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: string;
}

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"apply" | "history">("apply");

  // Sample leave history
  const leaveHistory: LeaveApplication[] = [
    {
      id: 1,
      type: "Sick Leave",
      startDate: "2025-04-21",
      endDate: "2025-04-23",
      reason: "Fever and cold",
      status: "approved",
      appliedOn: "2025-04-19",
    },
    {
      id: 2,
      type: "Personal Leave",
      startDate: "2025-03-10",
      endDate: "2025-03-10",
      reason: "Family function",
      status: "approved",
      appliedOn: "2025-03-05",
    },
    {
      id: 3,
      type: "Vacation",
      startDate: "2025-05-15",
      endDate: "2025-05-20",
      reason: "Family trip",
      status: "pending",
      appliedOn: "2025-04-25",
    },
  ];

  // Form state
  const [leaveForm, setLeaveForm] = useState({
    type: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setLeaveForm({
      ...leaveForm,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    alert("Leave application submitted successfully!");
    // Reset form
    setLeaveForm({
      type: "Sick Leave",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "apply"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("apply")}
            >
              Apply for Leave
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Leave History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "apply" ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Leave Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={leaveForm.type}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Paternity Leave">Paternity Leave</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={leaveForm.startDate}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={leaveForm.endDate}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 pr-10 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={leaveForm.reason}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  Submit Application
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveHistory.map((leave) => (
                      <tr key={leave.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {leave.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {leave.startDate === leave.endDate
                            ? leave.startDate
                            : `${leave.startDate} to ${leave.endDate}`}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {leave.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {leave.appliedOn}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                              leave.status
                            )}`}
                          >
                            {leave.status.charAt(0).toUpperCase() +
                              leave.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semiboldold mb-4">Leave Balance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Sick Leave</span>
                <span className="text-sm font-medium">7 / 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Casual Leave</span>
                <span className="text-sm font-medium">5 / 6</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: "83%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Vacation</span>
                <span className="text-sm font-medium">10 / 15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: "67%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Leaves</h3>
          {leaveHistory.filter(
            (leave) =>
              leave.status !== "rejected" &&
              new Date(leave.startDate) > new Date()
          ).length > 0 ? (
            <ul className="space-y-3">
              {leaveHistory
                .filter(
                  (leave) =>
                    leave.status !== "rejected" &&
                    new Date(leave.startDate) > new Date()
                )
                .map((leave) => (
                  <li key={leave.id} className="flex items-start space-x-3">
                    <div
                      className={`flex-shrink-0 w-3 h-3 mt-1.5 rounded-full ${
                        leave.status === "approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">{leave.type}</p>
                      <p className="text-xs text-gray-500">
                        {leave.startDate === leave.endDate
                          ? leave.startDate
                          : `${leave.startDate} to ${leave.endDate}`}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              No upcoming leaves scheduled.
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Leave Policies</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>
                Sick leave requires medical certificate for more than 2 days
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Apply for planned leaves at least 3 days in advance</span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>
                Unused leaves can be carried forward to next year (max 5)
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <Check className="h-4 w-4 text-emerald-500 mt-0.5" />
              <span>Maternity leave: 12 weeks, Paternity leave: 2 weeks</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
