"use client"

import type React from "react"
import { useState } from "react"
import { Search, Plus, Edit2, Trash2, User, Mail, Phone, Calendar, DollarSign, MapPin } from "react-feather"

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  department: string
  position: string
  startDate: string
  endDate?: string
  salary: number
  address: string
  status: "active" | "inactive"
}

const EmployeeDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "add">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  // Sample employee data
  const employees: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      department: "Engineering",
      position: "Senior Developer",
      startDate: "2022-03-15",
      salary: 85000,
      address: "123 Main St, Anytown, USA",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      department: "Marketing",
      position: "Marketing Manager",
      startDate: "2021-06-10",
      salary: 78000,
      address: "456 Oak Ave, Somewhere, USA",
      status: "active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "(555) 456-7890",
      department: "Finance",
      position: "Financial Analyst",
      startDate: "2023-01-05",
      salary: 72000,
      address: "789 Pine Rd, Elsewhere, USA",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 234-5678",
      department: "HR",
      position: "HR Specialist",
      startDate: "2022-09-20",
      salary: 65000,
      address: "321 Elm St, Nowhere, USA",
      status: "active",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "(555) 876-5432",
      department: "Engineering",
      position: "Frontend Developer",
      startDate: "2023-04-12",
      salary: 75000,
      address: "654 Maple Dr, Anyplace, USA",
      status: "active",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "(555) 345-6789",
      department: "Design",
      position: "UI/UX Designer",
      startDate: "2022-11-08",
      endDate: "2023-10-15",
      salary: 70000,
      address: "987 Cedar Ln, Somewhere, USA",
      status: "inactive",
    },
  ]

  // Form state
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    endDate: "",
    salary: "",
    address: "",
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmployeeForm({
      ...employeeForm,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    alert("Employee details submitted successfully!")
    // Reset form
    setEmployeeForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      startDate: "",
      endDate: "",
      salary: "",
      address: "",
    })
    setActiveTab("list")
  }

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <button
          onClick={() => {
            setActiveTab("add")
            setSelectedEmployee(null)
          }}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      {activeTab === "list" ? (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees by name, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setEmployeeForm({
                              name: employee.name,
                              email: employee.email,
                              phone: employee.phone,
                              department: employee.department,
                              position: employee.position,
                              startDate: employee.startDate,
                              endDate: employee.endDate || "",
                              salary: employee.salary.toString(),
                              address: employee.address,
                            })
                            setActiveTab("add")
                          }}
                          className="text-emerald-600 hover:text-emerald-900 mr-3"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedEmployee && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Employee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium">{selectedEmployee.name}</h4>
                      <p className="text-gray-500">{selectedEmployee.position}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{selectedEmployee.address}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>Start Date: {selectedEmployee.startDate}</span>
                  </div>
                  {selectedEmployee.endDate && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span>End Date: {selectedEmployee.endDate}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span>Salary: ${selectedEmployee.salary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={employeeForm.name}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employeeForm.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={employeeForm.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={employeeForm.department}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={employeeForm.position}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={employeeForm.salary}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={employeeForm.startDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date (if applicable)
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={employeeForm.endDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={employeeForm.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setActiveTab("list")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {selectedEmployee ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default EmployeeDetails
