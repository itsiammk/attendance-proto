
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CompanyLogo } from "@/components/icons";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, you'd handle user creation and authentication here
    // For demo, redirect to employee dashboard (as an example)
    router.push("/employee/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
           <div className="flex justify-center mb-4">
            <CompanyLogo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            Enter your information to get started with AttendancePro.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" required />
            </div>
            <Button type="submit" className="w-full font-semibold">
              Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary hover:text-primary/80 font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
