
'use server';

// Placeholder for employee data type. In a real app, this would come from a database.
interface Employee {
  id: string;
  name: string;
}

interface PunchData {
  selfieDataUri: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address?: string; // Address is now part of the punch data
}

// Placeholder for the current authenticated employee.
// In a real app, this would be determined by an authentication system.
const getCurrentEmployee = async (): Promise<Employee | null> => {
  // Simulate fetching an employee
  return { id: "EMP007", name: "Jane Doe" };
};

export async function recordCheckIn(data: PunchData) {
  const employee = await getCurrentEmployee();
  if (!employee) {
    console.error("No employee found to record check-in.");
    return { success: false, message: "User not found." };
  }

  const timestamp = new Date();
  console.log(`Server Action: Employee ${employee.name} (ID: ${employee.id}) checked IN at ${timestamp.toISOString()}`);
  console.log(`Selfie captured: ${data.selfieDataUri ? 'Yes' : 'No'}`);
  console.log(`Location: Lat ${data.location.latitude}, Lon ${data.location.longitude}`);
  console.log(`Address: ${data.address || 'Not provided/available'}`);
  
  // In a real application, you would save this to a database:
  // await db.collection('attendances').add({
  //   employeeId: employee.id,
  //   type: 'check-in',
  //   timestamp: timestamp,
  //   selfieDataUri: data.selfieDataUri,
  //   location: data.location,
  //   address: data.address, 
  // });
  return { success: true, message: `Checked in at ${timestamp.toLocaleTimeString()}`, timestamp: timestamp.toISOString() };
}

export async function recordCheckOut(data: PunchData) {
  const employee = await getCurrentEmployee();
  if (!employee) {
    console.error("No employee found to record check-out.");
    return { success: false, message: "User not found." };
  }

  const timestamp = new Date();
  console.log(`Server Action: Employee ${employee.name} (ID: ${employee.id}) checked OUT at ${timestamp.toISOString()}`);
  console.log(`Selfie captured: ${data.selfieDataUri ? 'Yes' : 'No'}`);
  console.log(`Location: Lat ${data.location.latitude}, Lon ${data.location.longitude}`);
  console.log(`Address: ${data.address || 'Not provided/available'}`);

  // In a real application, you would save this to a database:
  // await db.collection('attendances').add({
  //   employeeId: employee.id,
  //   type: 'check-out',
  //   timestamp: timestamp,
  //   selfieDataUri: data.selfieDataUri,
  //   location: data.location,
  //   address: data.address,
  // });
  return { success: true, message: `Checked out at ${timestamp.toLocaleTimeString()}`, timestamp: timestamp.toISOString() };
}
