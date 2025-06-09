
"use client";

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

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/admin/attendance/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center p-4 sm:p-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <CompanyLogo className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your credentials to access your AttendancePro account.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="text-sm sm:text-base" />
            </div>
            <Button type="submit" className="w-full font-semibold text-sm sm:text-base py-2.5 sm:py-3">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-4 sm:mt-6 p-4 sm:p-6 text-center text-xs sm:text-sm justify-center">
            <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 hover:underline">
                Sign up
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
