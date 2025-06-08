"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/employee/dashboard');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <p>Redirecting to employee dashboard...</p>
    </div>
  );
}
