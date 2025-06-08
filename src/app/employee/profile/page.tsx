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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={employee.avatarUrl} alt={employee.name} data-ai-hint="profile avatar" />
              <AvatarFallback className="text-2xl">{employeeInitials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{employee.name}</CardTitle>
              <CardDescription>{employee.jobTitle} - {employee.department}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" defaultValue={employee.employeeId} readOnly className="bg-muted/50"/>
            </div>
             <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" defaultValue={employee.jobTitle} readOnly className="bg-muted/50"/>
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={employee.name} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={employee.email} />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={employee.phone} />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={employee.department} readOnly className="bg-muted/50"/>
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="currentPassword">Current Password (for changes)</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password to make changes"/>
            </div>
             <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password"/>
            </div>
             <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password"/>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
