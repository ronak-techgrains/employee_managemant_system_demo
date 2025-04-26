"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, User } from "react-feather"

interface Employee {
  id: number
  name: string
  department: string
  avatar?: string
}

interface LeaveRecord {
  id: number
  employeeId: number
  date: string
  type: "sick" | "vacation" | "personal" | "maternity" | "paternity" | "other"
  status: "approved" | "pending" | "rejected"
}

const TeamCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Sample employee data
  const employees: Employee[] = [
    { id: 1, name: "John Doe", department: "Engineering" },
    { id: 2, name: "Jane Smith", department: "Marketing" },
    { id: 3, name: "Robert Johnson", department: "Finance" },
    { id: 4, name: "Emily Davis", department: "HR" },
    { id: 5, name: "Michael Wilson", department: "Engineering" },
    { id: 6, name: "Sarah Brown", department: "Design" },
    { id: 7, name: "David Miller", department: "Product" },
    { id: 8, name: "Jennifer Taylor", department: "Sales" },
  ]

  // Sample leave records
  const leaveRecords: LeaveRecord[] = [
    { id: 1, employeeId: 1, date: "2025-04-21", type: "sick", status: "approved" },
    { id: 2, employeeId: 1, date: "2025-04-22", type: "sick", status: "approved" },
    { id: 3, employeeId: 1, date: "2025-04-23", type: "sick", status: "approved" },
    { id: 4, employeeId: 2, date: "2025-04-25", type: "vacation", status: "approved" },
    { id: 5, employeeId: 2, date: "2025-04-26", type: "vacation", status: "approved" },
    { id: 6, employeeId: 2, date: "2025-04-27", type: "vacation", status: "approved" },
    { id: 7, employeeId: 2, date: "2025-04-28", type: "vacation", status: "approved" },
    { id: 8, employeeId: 2, date: "2025-04-29", type: "vacation", status: "approved" },
    { id: 9, employeeId: 3, date: "2025-04-15", type: "personal", status: "approved" },
    { id: 10, employeeId: 4, date: "2025-04-10", type: "personal", status: "approved" },
    { id: 11, employeeId: 5, date: "2025-04-05", type: "vacation", status: "approved" },
    { id: 12, employeeId: 6, date: "2025-04-18", type: "sick", status: "approved" },
    { id: 13, employeeId: 7, date: "2025-04-21", type: "personal", status: "approved" },
    { id: 14, employeeId: 8, date: "2025-04-30", type: "vacation", status: "pending" },
  ]

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Get leave records for a specific date
  const getLeavesForDate = (date: Date): LeaveRecord[] => {
    const formattedDate = formatDate(date)
    return leaveRecords.filter((record) => record.date === formattedDate)
  }

  // Get leave type color
  const getLeaveTypeColor = (type: string): string => {
    switch (type) {
      case "sick":
        return "bg-red-100 text-red-800"
      case "vacation":
        return "bg-blue-100 text-blue-800"
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "maternity":
        return "bg-pink-100 text-pink-800"
      case "paternity":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Render calendar
  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const formattedDate = formatDate(date)
      const leavesForDate = getLeavesForDate(date)
      const isSelected = selectedDate && formatDate(selectedDate) === formattedDate
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 transition-all cursor-pointer overflow-auto ${
            isSelected ? "ring-2 ring-emerald-500" : "hover:bg-gray-50"
          } ${isWeekend ? "bg-gray-50" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="font-medium mb-1">{day}</div>
          {leavesForDate.length > 0 && (
            <div className="space-y-1">
              {leavesForDate.length <= 3 ? (
                leavesForDate.map((leave) => {
                  const employee = employees.find((emp) => emp.id === leave.employeeId)
                  return (
                    <div
                      key={leave.id}
                      className={`text-xs px-1 py-0.5 rounded truncate ${getLeaveTypeColor(leave.type)}`}
                    >
                      {employee?.name}
                    </div>
                  )
                })
              ) : (
                <>
                  {leavesForDate.slice(0, 2).map((leave) => {
                    const employee = employees.find((emp) => emp.id === leave.employeeId)
                    return (
                      <div
                        key={leave.id}
                        className={`text-xs px-1 py-0.5 rounded truncate ${getLeaveTypeColor(leave.type)}`}
                      >
                        {employee?.name}
                      </div>
                    )
                  })}
                  <div className="text-xs text-gray-600">+{leavesForDate.length - 2} more</div>
                </>
              )}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  // Get month name and year
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  // Get selected date details
  const selectedDateLeaves = selectedDate ? getLeavesForDate(selectedDate) : []

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Leave Calendar</h1>
        <div className="flex items-center space-x-4">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">{monthYear}</h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">{renderCalendar()}</div>
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Leaves on{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          {selectedDateLeaves.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedDateLeaves.map((leave) => {
                const employee = employees.find((emp) => emp.id === leave.employeeId)
                return (
                  <div key={leave.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {employee?.avatar ? (
                          <img
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <User className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee?.name}</p>
                        <p className="text-xs text-gray-500">{employee?.department}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${getLeaveTypeColor(leave.type)}`}>
                        {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-600">No leaves scheduled for this date.</p>
          )}
        </div>
      )}

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Leave Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700">Sick Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-700">Vacation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-700">Personal Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
            <span className="text-sm text-gray-700">Maternity Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
            <span className="text-sm text-gray-700">Paternity Leave</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-sm text-gray-700">Other</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamCalendar
