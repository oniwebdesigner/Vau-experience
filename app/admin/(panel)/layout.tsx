import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/login');
  const unread = await prisma.contactMessage.count({ where: { read: false } }).catch(() => 0);

  return (
    <>
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-4 md:px-8">
          <p className="label text-ink-soft">VAU Experience · Paneli</p>
          <div className="mt-2">
            <AdminNav unread={unread} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">{children}</main>
    </>
  );
}
