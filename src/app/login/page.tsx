
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-primary/10 p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center p-6 sm:p-8">
          <div className="flex justify-center mb-4">
            <CompanyLogo className="h-12 w-12 sm:h-14 sm:w-14 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription className="text-sm sm:text-base pt-1">
            Enter your credentials to access your AttendancePro account.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="text-sm sm:text-base h-10"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-xs sm:text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required className="text-sm sm:text-base h-10" />
            </div>
            <Button type="submit" className="w-full font-semibold text-sm sm:text-base py-3 h-11">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-6 pt-4 sm:p-8 sm:pt-4 text-center text-xs sm:text-sm justify-center border-t bg-muted/30">
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
