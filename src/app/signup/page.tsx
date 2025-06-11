
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanyLogo } from "@/components/icons";
import { useRouter } from "next/navigation";
import { CompanySetupModal, type CompanySetupFormValues } from "@/components/company-setup-modal";

export default function SignupPage() {
  const router = useRouter();
  const [showCompanySetupModal, setShowCompanySetupModal] = React.useState(false);

  // Placeholder: In a real app, you'd store signup data (e.g., email)
  // and potentially pass it to the company setup or use it later.
  // const [signupData, setSignupData] = React.useState(null);

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you would submit signup form data to your backend here.
    // For now, we'll simulate success and open the company setup modal.
    // const formData = new FormData(event.target as HTMLFormElement);
    // const email = formData.get('email');
    // setSignupData({ email }); // Example
    
    setShowCompanySetupModal(true);
  };

  const handleCompanySetupComplete = (data: CompanySetupFormValues) => {
    // In a real app, you'd send 'data' to your backend here.
    console.log("Company setup completed with data:", data);
    setShowCompanySetupModal(false);
    router.push("/admin/attendance/dashboard"); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center p-6 sm:p-8">
           <div className="flex justify-center mb-4">
            <CompanyLogo className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-headline">Create Your Account</CardTitle>
          <CardDescription className="text-sm sm:text-base pt-1">
            Join AttendancePro and streamline your attendance management.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
          <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="John Doe" required className="text-sm sm:text-base h-10"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="text-sm sm:text-base h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required className="text-sm sm:text-base h-10"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required className="text-sm sm:text-base h-10"/>
            </div>
            <Button type="submit" className="w-full font-semibold text-sm sm:text-base py-3 h-11 mt-2">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-6 pt-4 sm:p-8 sm:pt-4 text-center text-xs sm:text-sm justify-center border-t bg-muted/30">
            <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Login
                </Link>
            </p>
        </CardFooter>
      </Card>

      <CompanySetupModal
        isOpen={showCompanySetupModal}
        onOpenChange={setShowCompanySetupModal}
        onSetupComplete={handleCompanySetupComplete}
      />
    </div>
  );
}

