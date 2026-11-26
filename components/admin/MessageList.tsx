'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { btn, cardCls } from './ui';

export interface MessageView {
  id: number;
  name: string;
  email: string;
  tour: string | null;
  date: string | null;
  guests: number | null;
  message: string;
  lang: string;
  read: boolean;
  createdAt: string; // already formatted on the server
}

export function MessageList({ messages }: { messages: MessageView[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const run = async (id: number, init: RequestInit) => {
    setBusyId(id);
    setError('');
    try {
      const res = await fetch(`/api/admin/messages/${id}`, init);
      if (!res.ok) setError('Veprimi nuk u krye.');
      else router.refresh();
    } catch {
      setError('Nuk u arrit lidhja me serverin.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold tracking-[-0.03em]">Mesazhet</h1>
      <p className="mt-2 text-[15px] text-ink-soft">Mesazhet nga formulari i faqes Kontakt.</p>
      {error && (
        <p role="alert" className="mt-5 text-sm font-medium text-clay-deep">
          {error}
        </p>
      )}
      {messages.length === 0 ? (
        <p className="mt-8 text-[15px] text-ink-soft">Nuk ka mesazhe ende.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {messages.map((m) => (
            <li key={m.id} className={`${cardCls} p-5 ${m.read ? '' : 'border-l-4 border-l-clay'}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">{m.name}</p>
                <p className="text-[13px] text-ink-soft">
                  {m.createdAt} · {m.lang.toUpperCase()}
                </p>
              </div>
              <p className="mt-1 text-[14px]">
                <a className="text-lagoon underline underline-offset-2" href={`mailto:${m.email}`}>
                  {m.email}
                </a>
              </p>
              {(m.tour || m.date || m.guests) && (
                <p className="mt-2 text-[13px] text-ink-soft">
                  {[m.tour, m.date, m.guests ? `${m.guests} persona` : null].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-relaxed">{m.message}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`mailto:${m.email}`} className={btn.small}>
                  Përgjigju me email
                </a>
                <button
                  type="button"
                  disabled={busyId === m.id}
                  onClick={() =>
                    run(m.id, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ read: !m.read }),
                    })
                  }
                  className={btn.small}
                >
                  {m.read ? 'Shëno si të palexuar' : 'Shëno si të lexuar'}
                </button>
                <button
                  type="button"
                  disabled={busyId === m.id}
                  onClick={() => {
                    if (window.confirm('Ta fshij këtë mesazh?')) void run(m.id, { method: 'DELETE' });
                  }}
                  className={`${btn.small} border-clay/40 text-clay-deep hover:border-clay hover:bg-clay hover:text-sand`}
                >
                  Fshi
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
