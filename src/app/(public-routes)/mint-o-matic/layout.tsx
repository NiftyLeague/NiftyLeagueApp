import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mint-o-Matic' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
