import type { Metadata } from 'next';

// The admin is private: never indexed, never cached.
export const metadata: Metadata = {
  title: 'Paneli — VAU Experience',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-sand-paper font-sans text-ink">{children}</div>;
}
