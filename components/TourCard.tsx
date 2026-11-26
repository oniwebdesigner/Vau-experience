'use client';

import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import { useTranslation } from '../contexts/LanguageContext';
import type { Tour } from '../types/tour';
import { getCategory } from '../utils/bookable';

interface TourCardProps {
  tour: Tour;
  size: 'large' | 'compact';
  onOpen: (tour: Tour) => void;
}

export function TourCard({ tour, size, onOpen }: TourCardProps) {
  const { openBooking } = useBooking();
  const { t, loc, price } = useTranslation();
  const title = loc(tour.title);

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(tour)}
        tabIndex={-1}
        aria-hidden
        className={`block w-full overflow-hidden rounded-media bg-sand-deep ${size === 'large' ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}
      >
        <img
          src={tour.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </button>
      <div className="mt-5 flex flex-1 flex-col border-t border-ink/15 pt-4">
        <p className="label text-ink-soft">
          {loc(getCategory(tour.category).label)} · {loc(tour.duration)}
        </p>
        <h3
          className={`mt-3 font-display font-semibold leading-[1.02] tracking-[-0.035em] ${
            size === 'large' ? 'text-3xl md:text-[2.9rem]' : 'text-2xl md:text-[2.1rem]'
          }`}
        >
          <button
            type="button"
            onClick={() => onOpen(tour)}
            aria-label={t.common.openDetails(title)}
            className="text-left transition-colors duration-200 hover:text-lagoon"
          >
            {title}
          </button>
        </h3>
        <p className="mt-2 text-sm text-ink-soft">{loc(tour.location)}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <p className="price text-ink-soft">
            {price(tour.price)} <span className="opacity-80">{t.common.fromPerson}</span>
          </p>
          <button
            type="button"
            onClick={() => openBooking(tour.id)}
            className="label inline-flex h-9 items-center whitespace-nowrap rounded-full border border-ink/25 px-4 text-ink transition-colors duration-200 hover:border-clay hover:bg-clay hover:text-sand"
          >
            {t.common.book}
          </button>
        </div>
      </div>
    </article>
  );
}
