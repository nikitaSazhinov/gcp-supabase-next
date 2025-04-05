'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid hydration issues
const DashboardContent = dynamic(
  () => import('@/app/components/DashboardContent'),
  { ssr: false }
);

export default function DashboardPage() {
  return <DashboardContent />;
} 