
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page by default
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Loading AttendancePro...</p>
    </div>
  );
}
