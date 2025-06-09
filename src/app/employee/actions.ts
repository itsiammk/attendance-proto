
'use server';

import { getAddressFromCoordinates } from "@/lib/locationService";

interface Employee {
  id: string;
  name: string;
  // Add other relevant employee details if needed
}

interface PunchData {
  selfieDataUri: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address?: string;
}

// --- Mock Data for Employee Attendance History ---
interface CareerSummary {
  totalPresent: number;
  totalAbsent: number;
  totalHalfDay: number;
  totalLeave: number;
  totalWorkingDays: number; // Could be days employed or sum of workdays from monthly records
  averageWorkHours: string; // e.g., "8h 15m"
}

interface MonthlyAttendanceRecord {
  month: string; // e.g., "July"
  year: number;  // e.g., 2024
  present: number;
  absent: number;
  halfDay: number;
  leave: number;
  holidays: number;
  weekOffs: number;
  totalWorkableDays: number; // Days in month - weekoffs - holidays
  actualWorkDays: number; // present + (halfDay * 0.5)
  averageHoursPerDay?: string;
}

interface DailyLogEntry {
    date: string; // YYYY-MM-DD
    status: "Present" | "Absent" | "Half-Day" | "Leave" | "Holiday" | "Week Off";
    firstIn?: string; // "HH:MM AM/PM"
    lastOut?: string; // "HH:MM AM/PM"
    hoursWorked?: string; // "Xh Ym"
    remarks?: string;
}

interface EmployeeAttendanceHistory {
  employeeId: string;
  employeeName: string;
  careerSummary: CareerSummary;
  monthlyRecords: MonthlyAttendanceRecord[];
  detailedMonthlyLogs?: { [monthYear: string]: DailyLogEntry[] }; // e.g., "July 2024": [DailyLogEntry, ...]
}
// --- End Mock Data Definitions ---


const getCurrentEmployee = async (): Promise<Employee | null> => {
  return { id: "EMP007", name: "Jane Doe" };
};

export async function getEmployeeDashboardData() {
  const employee = await getCurrentEmployee();
  if (!employee) {
    return {
      employeeName: "Employee",
      employeeActionStatus: "Not Checked In" as const,
      lastActionDisplayTime: null,
      lastActionAddress: "N/A",
    };
  }

  // In a real app, you'd fetch the latest status from the database.
  // For now, we'll return a default state.
  return {
    employeeName: employee.name,
    employeeActionStatus: "Not Checked In" as const, // Or fetch from DB/localStorage
    lastActionDisplayTime: null, // Or fetch from DB/localStorage
    lastActionAddress: "N/A", // Or fetch from DB/localStorage
  };
}


export async function recordCheckIn(data: PunchData) {
  const employee = await getCurrentEmployee();
  if (!employee) {
    console.error("No employee found to record check-in.");
    return { success: false, message: "User not found." };
  }

  const timestamp = new Date();
  console.log(`SIMULATING BACKEND CALL: Employee ${employee.name} (ID: ${employee.id}) checking IN at ${timestamp.toISOString()}`);
  console.log(`Selfie captured: ${data.selfieDataUri ? 'Yes (Data URI length: ' + data.selfieDataUri.length + ')' : 'No'}`);
  console.log(`Location: Lat ${data.location.latitude}, Lon ${data.location.longitude}`);
  console.log(`Address: ${data.address || 'Not provided/available'}`);
  console.log(`Data that would be sent to backend: `, {
    employeeId: employee.id,
    type: 'check-in',
    timestamp: timestamp.toISOString(),
    selfieDataUriLength: data.selfieDataUri.length, // Don't log the full URI
    location: data.location,
    address: data.address,
  });
  
  // In a real app:
  // const response = await fetch('/api/attendance/check-in', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ ... }),
  // });
  // const result = await response.json();
  // return result;

  return { success: true, message: `Checked in at ${timestamp.toLocaleTimeString()}`, timestamp: timestamp.toISOString(), address: data.address };
}

export async function recordCheckOut(data: PunchData) {
  const employee = await getCurrentEmployee();
  if (!employee) {
    console.error("No employee found to record check-out.");
    return { success: false, message: "User not found." };
  }

  const timestamp = new Date();
  console.log(`SIMULATING BACKEND CALL: Employee ${employee.name} (ID: ${employee.id}) checking OUT at ${timestamp.toISOString()}`);
  console.log(`Selfie captured: ${data.selfieDataUri ? 'Yes (Data URI length: ' + data.selfieDataUri.length + ')' : 'No'}`);
  console.log(`Location: Lat ${data.location.latitude}, Lon ${data.location.longitude}`);
  console.log(`Address: ${data.address || 'Not provided/available'}`);
  console.log(`Data that would be sent to backend: `, {
    employeeId: employee.id,
    type: 'check-out',
    timestamp: timestamp.toISOString(),
    selfieDataUriLength: data.selfieDataUri.length, // Don't log the full URI
    location: data.location,
    address: data.address,
  });

  // In a real app, similar fetch call as check-in
  return { success: true, message: `Checked out at ${timestamp.toLocaleTimeString()}`, timestamp: timestamp.toISOString(), address: data.address };
}


// New server action for employee attendance history
export async function getEmployeeAttendanceHistory(): Promise<EmployeeAttendanceHistory | null> {
  const employee = await getCurrentEmployee();
  if (!employee) {
    return null;
  }

  // --- MOCK DATA ---
  const mockHistory: EmployeeAttendanceHistory = {
    employeeId: employee.id,
    employeeName: employee.name,
    careerSummary: {
      totalPresent: 250,
      totalAbsent: 15,
      totalHalfDay: 20,
      totalLeave: 30,
      totalWorkingDays: 285, // Example: present + (halfDay * 0.5) + leave
      averageWorkHours: "8h 05m",
    },
    monthlyRecords: [
      { month: "July", year: 2024, present: 18, absent: 1, halfDay: 2, leave: 1, holidays: 1, weekOffs: 8, totalWorkableDays: 21, actualWorkDays: 20, averageHoursPerDay: "7h 55m" },
      { month: "June", year: 2024, present: 20, absent: 0, halfDay: 1, leave: 1, holidays: 0, weekOffs: 8, totalWorkableDays: 21, actualWorkDays: 20.5, averageHoursPerDay: "8h 10m" },
      { month: "May", year: 2024, present: 19, absent: 2, halfDay: 0, leave: 2, holidays: 1, weekOffs: 9, totalWorkableDays: 20, actualWorkDays: 19, averageHoursPerDay: "8h 00m" },
      { month: "April", year: 2024, present: 22, absent: 0, halfDay: 0, leave: 0, holidays: 0, weekOffs: 8, totalWorkableDays: 22, actualWorkDays: 22, averageHoursPerDay: "8h 15m" },
    ],
    // Optional: Populate detailedMonthlyLogs if needed for a calendar view later
    // detailedMonthlyLogs: {
    //   "July 2024": [
    //     { date: "2024-07-01", status: "Present", firstIn: "09:00 AM", lastOut: "06:00 PM", hoursWorked: "9h 0m" },
    //     // ... more daily logs for July
    //   ]
    // }
  };
  // --- END MOCK DATA ---

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockHistory;
}
