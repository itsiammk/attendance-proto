
'use server';

import type { EmployeeAttendanceSummary } from "./components/attendance-table-types";

// Mock data - this would be fetched from a backend/database in a real app
const mockData: EmployeeAttendanceSummary[] = [
  { id: "EMP001", name: "Alice Johnson", phone: "555-0101", jobTitle: "Software Engineer", present: 20, absent: 1, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/40x40.png?text=AJ" },
  { id: "EMP002", name: "Bob Williams", phone: "555-0102", jobTitle: "Product Manager", present: 22, absent: 0, halfDay: 0, weekOff: 8, holiday: 1, avatar: "https://placehold.co/40x40.png?text=BW" },
  { id: "EMP003", name: "Carol Davis", phone: "555-0103", jobTitle: "UX Designer", present: 19, absent: 2, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/40x40.png?text=CD" },
  { id: "EMP004", name: "David Brown", phone: "555-0104", jobTitle: "QA Tester", present: 21, absent: 0, halfDay: 1, weekOff: 8, holiday: 1, avatar: "https://placehold.co/40x40.png?text=DB" },
  { id: "EMP005", name: "Eve Green", phone: "555-0105", jobTitle: "DevOps Engineer", present: 18, absent: 3, halfDay: 0, weekOff: 8, holiday: 2, avatar: "https://placehold.co/40x40.png?text=EG" },
];

export async function getMockAttendanceData(): Promise<EmployeeAttendanceSummary[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData;
}
