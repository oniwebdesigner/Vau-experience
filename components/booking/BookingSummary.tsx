'use client';

import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import type { BookableTour } from '../../types/tour';

interface BookingSummaryProps {
  tour: BookableTour;
  adults: number;
  children: number;
  total: number;
}

export function BookingSummary({ tour, adults, children, total }: BookingSummaryProps) {
  const { t, loc, price } = useTranslation();
  const s = t.booking.summary;
  const premium = tour.kind === 'premium';
  const title = loc(tour.title);
  const guests = adults + children;

  return (
    <aside className="border-b border-ink/10 bg-sand-deep md:border-b-0 md:border-r" aria-label={s.aria}>
      <div className="md:sticky md:top-0">
        <div className="hidden aspect-[4/3] overflow-hidden bg-lagoon-night md:block">
          <img src={tour.image} alt={title} className="h-full w-full object-cover" />
        </div>

        <div className="px-6 pb-6 pt-16 sm:px-10 md:pb-10 md:pt-8">
          <div className="flex items-start gap-4">
            <img src={tour.image} alt="" className="h-20 w-16 shrink-0 rounded-[6px] object-cover md:hidden" />
            <div className="min-w-0">
              <span
                className={`label inline-flex h-6 items-center rounded-full px-2.5 text-[10px] ${
                  premium ? 'bg-gold text-lagoon-night' : 'border border-lagoon/40 text-lagoon'
                }`}
              >
                {premium ? s.premium : s.normal}
              </span>
              <p className="mt-3 break-words font-display text-2xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-[2rem]">
                {title}
              </p>
            </div>
          </div>

          <dl className="mt-6 border-t border-ink/15 text-[14px]">
            {[
              { k: t.common.location, v: loc(tour.location) },
              { k: t.common.duration, v: loc(tour.duration) },
              { k: t.common.perPerson, v: price(tour.pricePerPerson) },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-3">
                <dt className="label shrink-0 text-ink-soft">{row.k}</dt>
                <dd className="min-w-0 text-right tabular-nums text-ink-soft">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 hidden rounded-[6px] bg-sand p-5 md:block" aria-live="polite">
            <div className="flex items-baseline justify-between gap-4">
              <p className="label text-ink-soft">{t.booking.total}</p>
              <p className="price whitespace-nowrap text-[15px] text-ink">{price(total)}</p>
            </div>
            <p className="mt-2 text-[13px] tabular-nums text-ink-soft">
              {s.guests(guests)} × {price(tour.pricePerPerson)}
            </p>
          </div>
          <p className="mt-4 hidden text-xs leading-relaxed text-ink-soft md:block">{s.note}</p>
        </div>
      </div>
    </aside>
  );
}
