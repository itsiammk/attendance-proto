"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/attendance/dashboard');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
