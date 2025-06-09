
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EmployeeProfilePage() {
  // Placeholder data
  const employee = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-0123",
    employeeId: "EMP007",
    department: "Marketing",
    jobTitle: "Marketing Specialist",
    avatarUrl: "https://placehold.co/100x100.png?text=JD",
  };
  const employeeInitials = employee.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="space-y-8"> 
      <div className="mb-8"> 
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information and account settings.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-primary/50">
              <AvatarImage src={employee.avatarUrl} alt={employee.name} data-ai-hint="profile avatar" />
              <AvatarFallback className="text-2xl sm:text-3xl">{employeeInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl font-headline">{employee.name}</CardTitle>
              <CardDescription className="text-base">{employee.jobTitle} - {employee.department}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 p-4 sm:p-6"> 
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-2 mb-0">Personal Information</h3>
            <div className="w-full">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={employee.name} />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={employee.email} />
            </div>
            <div className="w-full">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={employee.phone} />
            </div>
            <div className="md:col-span-2"> 
            </div>
            
            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-4 mb-0">Work Details</h3>
            <div className="w-full">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" defaultValue={employee.employeeId} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
             <div className="w-full">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" defaultValue={employee.jobTitle} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
            <div className="w-full">
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={employee.department} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
             <div className="md:col-span-2"> 
            </div>

            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-4 mb-0">Password Settings</h3>
            <div className="w-full">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password"/>
            </div>
             <div className="w-full hidden md:block">
            </div>
             <div className="w-full">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password"/>
            </div>
             <div className="w-full">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password"/>
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
