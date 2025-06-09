
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
    <div className="space-y-8"> {/* Consistent spacing */}
      <div className="mb-8"> {/* Consistent spacing */}
        <h1 className="text-3xl font-headline font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information and account settings.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary/50">
              <AvatarImage src={employee.avatarUrl} alt={employee.name} data-ai-hint="profile avatar" />
              <AvatarFallback className="text-3xl">{employeeInitials}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-headline">{employee.name}</CardTitle>
              <CardDescription className="text-base">{employee.jobTitle} - {employee.department}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4"> {/* Added pt-4 for CardContent */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-2 mb-0">Personal Information</h3>
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
            <div className="md:col-span-2"> {/* Empty div for spacing or future element */}
            </div>
            
            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-4 mb-0">Work Details</h3>
            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" defaultValue={employee.employeeId} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
             <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" defaultValue={employee.jobTitle} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" defaultValue={employee.department} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
             <div className="md:col-span-2"> {/* Empty div for spacing or future element */}
            </div>

            <h3 className="md:col-span-2 text-lg font-headline font-semibold mt-4 mb-0">Password Settings</h3>
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password to make changes"/>
            </div>
             <div>
               {/* Empty div for spacing or future element */}
            </div>
             <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password"/>
            </div>
             <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password"/>
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    