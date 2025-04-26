"use client"

import type React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

interface AttendanceRecord {
  date: string
  status: "present" | "absent" | "half-day" | "weekend" | "holiday" | "leave"
  note?: string
}

const AttendanceCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Sample attendance data
  const attendanceData: AttendanceRecord[] = [
    { date: "2025-04-01", status: "present" },
    { date: "2025-04-02", status: "present" },
    { date: "2025-04-03", status: "present" },
    { date: "2025-04-04", status: "present" },
    { date: "2025-04-05", status: "weekend" },
    { date: "2025-04-06", status: "weekend" },
    { date: "2025-04-07", status: "present" },
    { date: "2025-04-08", status: "present" },
    { date: "2025-04-09", status: "present" },
    { date: "2025-04-10", status: "half-day", note: "Left early - Doctor appointment" },
    { date: "2025-04-11", status: "present" },
    { date: "2025-04-12", status: "weekend" },
    { date: "2025-04-13", status: "weekend" },
    { date: "2025-04-14", status: "present" },
    { date: "2025-04-15", status: "present" },
    { date: "2025-04-16", status: "present" },
    { date: "2025-04-17", status: "present" },
    { date: "2025-04-18", status: "present" },
    { date: "2025-04-19", status: "weekend" },
    { date: "2025-04-20", status: "weekend" },
    { date: "2025-04-21", status: "leave", note: "Sick leave" },
    { date: "2025-04-22", status: "leave", note: "Sick leave" },
    { date: "2025-04-23", status: "leave", note: "Sick leave" },
    { date: "2025-04-24", status: "present" },
    { date: "2025-04-25", status: "present" },
    { date: "2025-04-26", status: "weekend" },
    { date: "2025-04-27", status: "weekend" },
    { date: "2025-04-28", status: "present" },
    { date: "2025-04-29", status: "present" },
    { date: "2025-04-30", status: "present" },
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

  // Get attendance status for a specific date
  const getAttendanceStatus = (date: Date): AttendanceRecord | undefined => {
    const formattedDate = formatDate(date)
    return attendanceData.find((record) => record.date === formattedDate)
  }

  // Get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "half-day":
        return "bg-yellow-100 text-yellow-800"
      case "weekend":
        return "bg-gray-100 text-gray-500"
      case "holiday":
        return "bg-blue-100 text-blue-800"
      case "leave":
        return "bg-purple-100 text-purple-800"
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
      const attendanceRecord = getAttendanceStatus(date)
      const isSelected = selectedDate && formatDate(selectedDate) === formattedDate

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-2 transition-all cursor-pointer ${
            isSelected ? "ring-2 ring-emerald-500" : "hover:bg-gray-50"
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start">
            <span className="font-medium">{day}</span>
            {attendanceRecord && (
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(attendanceRecord.status)}`}>
                {attendanceRecord.status.replace("-", " ")}
              </span>
            )}
          </div>
          {attendanceRecord?.note && <p className="text-xs text-gray-600 mt-1 truncate">{attendanceRecord.note}</p>}
        </div>,
      )
    }

    return days
  }

  // Get month name and year
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  // Get selected date details
  const selectedDateRecord = selectedDate ? getAttendanceStatus(selectedDate) : null

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Calendar</h1>
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
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>

          {selectedDateRecord ? (
            <div>
              <div className="flex items-center mb-4">
                <span className="mr-2">Status:</span>
                <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(selectedDateRecord.status)}`}>
                  {selectedDateRecord.status.replace("-", " ")}
                </span>
              </div>

              {selectedDateRecord.note && (
                <div>
                  <p className="text-sm text-gray-700 font-medium">Note:</p>
                  <p className="text-sm text-gray-600">{selectedDateRecord.note}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600">No attendance record for this date.</p>
          )}
        </div>
      )}

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-xl font-bold text-green-600">22</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-xl font-bold text-red-600">0</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Half Day</p>
            <p className="text-xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Leave</p>
            <p className="text-xl font-bold text-purple-600">3</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Holiday</p>
            <p className="text-xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Weekend</p>
            <p className="text-xl font-bold text-gray-600">8</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendanceCalendar
