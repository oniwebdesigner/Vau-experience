'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { btn } from './ui';

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  const link = (href: string, active: boolean) =>
    `relative py-1 text-[14px] font-medium transition-colors ${active ? 'text-lagoon' : 'text-ink-soft hover:text-ink'}`;

  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Paneli">
      <Link href="/admin" className={link('/admin', pathname === '/admin' || pathname.startsWith('/admin/tours'))}>
        Touret
      </Link>
      <Link href="/admin/messages" className={link('/admin/messages', pathname.startsWith('/admin/messages'))}>
        Mesazhet
        {unread > 0 && (
          <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1.5 text-[11px] font-semibold text-sand">
            {unread}
          </span>
        )}
      </Link>
      <a href="/" target="_blank" rel="noreferrer" className={link('/', false)}>
        Shiko faqen
      </a>
      <button type="button" onClick={logout} className={`${btn.small} ml-auto`}>
        Dil
      </button>
    </nav>
  );
}
