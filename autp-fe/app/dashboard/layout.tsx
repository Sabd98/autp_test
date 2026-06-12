'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useAuthStore';
import ResponsiveLayout from '../components/layout/ResponsiveLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}
