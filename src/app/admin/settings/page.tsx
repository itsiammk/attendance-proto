import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

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
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-headline font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company profile, branches, and general settings.
        </p>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Update your company's information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
            <div className="w-full">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" defaultValue={companyDetails.name} />
            </div>
            <div className="w-full">
              <Label htmlFor="staffCount">Staff Count</Label>
              <Input id="staffCount" type="number" defaultValue={companyDetails.staffCount} />
            </div>
            <div className="w-full">
              <Label htmlFor="businessType">Business Type</Label>
              <Select defaultValue={companyDetails.businessType.toLowerCase()}>
                <SelectTrigger id="businessType" className="w-full">
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
             <div className="w-full">
              <Label htmlFor="companyCode">Company Code</Label>
              <Input id="companyCode" defaultValue={companyDetails.companyCode} readOnly className="bg-muted/50 cursor-not-allowed"/>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue={companyDetails.address} placeholder="Enter company address"/>
              <p className="text-xs text-muted-foreground mt-1">Google Maps integration for address validation will be here.</p>
            </div>
            
            <div className="md:col-span-2 pt-4">
                <Separator className="mb-4 sm:mb-6"/>
                <h3 className="text-lg font-headline font-semibold mb-3 sm:mb-4">Admin Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4">
                    <div className="w-full">
                        <Label htmlFor="adminName">Admin Name</Label>
                        <Input id="adminName" defaultValue={companyDetails.adminName} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input id="adminEmail" type="email" defaultValue={companyDetails.adminEmail} />
                    </div>
                 </div>
            </div>

            <div className="md:col-span-2 flex justify-end pt-4">
              <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Other Settings</CardTitle>
          <CardDescription>Manage branches, departments, and notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="p-4 sm:p-6 border rounded-lg text-center bg-muted/50">
            <p className="text-muted-foreground text-sm sm:text-base">
                Branch management, department setup, and notification settings will be available here in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
