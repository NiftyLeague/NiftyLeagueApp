import { IMXProvider } from '@/contexts/IMXContext';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <IMXProvider>{children}</IMXProvider>
    </AuthGuard>
  );
}
