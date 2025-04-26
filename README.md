# Employee Management System

A comprehensive employee management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Dashboard
- Overview of key metrics (total employees, attendance, leaves)
- Recent activity feed
- Upcoming leaves

### Attendance Management
- Calendar view for attendance tracking
- Check-in and check-out functionality
- Attendance status indicators (present, absent, leave)
- Historical attendance records

### Leave Management
- Leave application form
- Leave calendar showing all employees' leave status
- Leave history with approval status
- Different leave types (annual, sick, personal, etc.)

### Employee Management
- Employee directory with search and filter functionality
- Detailed employee profiles
- Employee onboarding form
- Comprehensive employee details including:
  - Personal information
  - Employment details
  - Salary information
  - Skills and education
  - Documents
  - Attendance and leave records

## Technical Implementation

### Frontend
- **Next.js**: App Router for routing and server components
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and attractive UI design
- **shadcn/ui**: Component library for consistent UI elements
- **React Hook Form**: For form handling with validation
- **Zod**: For schema validation

### Data Management
- Mock data implementation (can be replaced with actual API calls)
- Simulated API responses for demonstration purposes

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js App Router pages and layouts
- `/components`: Reusable UI components
- `/lib`: Utility functions and data handling
- `/hooks`: Custom React hooks

## Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile devices

## Future Enhancements

- Authentication and role-based access control
- Integration with backend APIs
- Payroll management
- Performance reviews
- Time tracking
- Reporting and analytics
- Document management system
- Mobile app integration
