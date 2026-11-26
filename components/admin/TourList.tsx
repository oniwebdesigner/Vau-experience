'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { categories } from '../../data/categories';
import type { AdminTour } from '../../lib/tours';
import { btn, cardCls } from './ui';

function formatLek(n: number) {
  return `${n.toLocaleString('de-DE')} Lekë`;
}

function Row({ tour, busy, onToggle, onDelete }: {
  tour: AdminTour;
  busy: boolean;
  onToggle: (t: AdminTour) => void;
  onDelete: (t: AdminTour) => void;
}) {
  const { input } = tour;
  const category = categories.find((c) => c.name === input.category)?.label.sq ?? input.category;
  return (
    <li className={`${cardCls} flex flex-col gap-4 p-4 sm:flex-row sm:items-center`}>
      <img
        src={tour.images[0]?.src ?? '/placeholder.svg'}
        alt=""
        className="h-24 w-full shrink-0 rounded-[6px] bg-sand-deep object-cover sm:h-20 sm:w-32"
      />
      <div className="min-w-0 flex-1">
        <p className="break-words font-display text-xl font-semibold tracking-[-0.02em]">{input.title.sq}</p>
        <p className="mt-1 text-[13px] text-ink-soft">
          {input.isPremium ? 'Premium' : category} · {input.duration.sq} · {formatLek(input.price)}
          {input.isPremium ? ` (${input.priceNote.sq})` : ' për person'}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
          {!input.published && <span className="rounded-full bg-ink/10 px-2.5 py-1 text-ink-soft">E fshehur</span>}
          {input.featured && <span className="rounded-full bg-gold-pale px-2.5 py-1 text-gold-deep">Në ballinë</span>}
          <span className="rounded-full bg-sand px-2.5 py-1 text-ink-soft">{tour.images.length} foto</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <button type="button" disabled={busy} onClick={() => onToggle(tour)} className={btn.small}>
          {input.published ? 'Fshih' : 'Publiko'}
        </button>
        <Link href={`/admin/tours/${tour.id}`} className={btn.small}>
          Ndrysho
        </Link>
        <button
          type="button"
          disabled={busy}
          onClick={() => onDelete(tour)}
          className={`${btn.small} border-clay/40 text-clay-deep hover:border-clay hover:bg-clay hover:text-sand`}
        >
          Fshi
        </button>
      </div>
    </li>
  );
}

export function TourList({ tours }: { tours: AdminTour[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [importing, setImporting] = useState(false);

  const normal = tours.filter((t) => !t.input.isPremium);
  const premium = tours.filter((t) => t.input.isPremium);

  const call = async (id: number, init: RequestInit, failure: string) => {
    setBusyId(id);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/tours/${id}`, init);
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setMessage(body?.error ?? failure);
        return;
      }
      router.refresh();
    } catch {
      setMessage(failure);
    } finally {
      setBusyId(null);
    }
  };

  const toggle = (t: AdminTour) =>
    call(
      t.id,
      { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !t.input.published }) },
      'Ndryshimi nuk u ruajt.',
    );

  const remove = (t: AdminTour) => {
    if (!window.confirm(`Të fshihet "${t.input.title.sq}"? Fotot e tij fshihen gjithashtu dhe nuk kthehen më.`)) return;
    void call(t.id, { method: 'DELETE' }, 'Touri nuk u fshi.');
  };

  const importSample = async () => {
    setImporting(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/sample', { method: 'POST' });
      if (!res.ok) setMessage('Toure shembull nuk u ngarkuan.');
      else router.refresh();
    } catch {
      setMessage('Nuk u arrit lidhja me serverin.');
    } finally {
      setImporting(false);
    }
  };

  const section = (title: string, list: AdminTour[]) => (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
        {title} <span className="text-ink-soft">({list.length})</span>
      </h2>
      {list.length === 0 ? (
        <p className="mt-3 text-[15px] text-ink-soft">Nuk ka ende.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((t) => (
            <Row key={t.id} tour={t} busy={busyId === t.id} onToggle={toggle} onDelete={remove} />
          ))}
        </ul>
      )}
    </section>
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.03em]">Touret</h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Çdo ndryshim shfaqet menjëherë në faqe. Touret e fshehura nuk dalin te vizitorët.
          </p>
        </div>
        <Link href="/admin/tours/new" className={btn.primary}>
          Shto tour
        </Link>
      </div>

      {message && (
        <p role="alert" className="mt-5 rounded-media border border-clay/40 bg-white p-3 text-sm font-medium text-clay-deep">
          {message}
        </p>
      )}

      {tours.length === 0 && (
        <div className={`${cardCls} mt-8 p-6`}>
          <p className="font-display text-2xl font-semibold tracking-[-0.02em]">Nuk ka toure ende.</p>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Shtoni tourin e parë, ose ngarkoni tourët shembull nga dizajni (me foto provizore) dhe i ndryshoni ose fshini
            kur të keni materialet e klientit.
          </p>
          <button type="button" onClick={importSample} disabled={importing} className={`${btn.outline} mt-5`}>
            {importing ? 'Duke ngarkuar…' : 'Ngarko toure shembull'}
          </button>
        </div>
      )}

      {tours.length > 0 && (
        <>
          {section('Toure', normal)}
          {section('Premium', premium)}
        </>
      )}
    </div>
  );
}
