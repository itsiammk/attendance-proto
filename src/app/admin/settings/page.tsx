import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CompanySettingsPage() {
  // Placeholder data for form
  const companyDetails = {
    name: "AttendancePro Inc.",
    staffCount: 120,
    businessType: "IT",
    address: "123 Tech Street, Silicon Valley, CA 94000",
    adminName: "Admin User",
    adminEmail: "admin@example.com",
    companyCode: "ATTPRO123"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company profile, branches, and general settings.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Update your company's information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue={companyDetails.name} />
            </div>
            <div>
              <Label htmlFor="staffCount">Staff Count</Label>
              <Input id="staffCount" type="number" defaultValue={companyDetails.staffCount} />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Select defaultValue={companyDetails.businessType.toLowerCase()}>
                <SelectTrigger id="businessType">
                  <SelectValue placeholder="Select Business Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT / Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="companyCode">Company Code</Label>
              <Input id="companyCode" defaultValue={companyDetails.companyCode} readOnly className="bg-muted/50"/>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue={companyDetails.address} placeholder="Enter company address"/>
              <p className="text-xs text-muted-foreground mt-1">Google Maps integration for address validation will be here.</p>
            </div>
            
            <div className="md:col-span-2 border-t pt-6 mt-2">
                <h3 className="text-lg font-semibold mb-2">Admin Details</h3>
                 <div>
                    <Label htmlFor="adminName">Admin Name</Label>
                    <Input id="adminName" defaultValue={companyDetails.adminName} />
                </div>
                <div className="mt-4">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" type="email" defaultValue={companyDetails.adminEmail} />
                </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Placeholder for other settings like branches, departments, etc. */}
      <Card>
        <CardHeader>
          <CardTitle>Other Settings</CardTitle>
          <CardDescription>Manage branches, departments, and notification preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Branch management, department setup, and notification settings will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
