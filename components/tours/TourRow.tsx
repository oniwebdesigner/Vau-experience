'use client';

import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { useTranslation } from '../../contexts/LanguageContext';
import type { Tour } from '../../types/tour';
import { getCategory } from '../../utils/bookable';
import { buttonClasses } from '../../utils/styles';

interface TourRowProps {
  tour: Tour;
  onOpen: (tour: Tour) => void;
}

export function TourRow({ tour, onOpen }: TourRowProps) {
  const { openBooking } = useBooking();
  const { t, loc, price } = useTranslation();

  return (
    <article className="group grid gap-6 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8 md:py-12">
      <button
        type="button"
        onClick={() => onOpen(tour)}
        tabIndex={-1}
        aria-hidden
        className="block aspect-[4/3] overflow-hidden rounded-media bg-sand-deep md:col-span-4"
      >
        <img
          src={tour.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </button>

      <div className="flex min-w-0 flex-col md:col-span-5">
        <p className="label text-clay">{loc(getCategory(tour.category).label)}</p>
        <h2 className="mt-3 break-words font-display text-3xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-[2.75rem]">
          {loc(tour.title)}
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.75] text-ink-soft">{loc(tour.summary)}</p>
        <button
          type="button"
          onClick={() => onOpen(tour)}
          className="group/link mt-6 inline-flex w-fit items-center gap-2 border-b border-ink/25 pb-1 text-[14px] font-semibold transition-colors duration-200 hover:border-clay hover:text-clay"
        >
          {t.toursPage.details}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </button>
      </div>

      <div className="flex min-w-0 flex-col gap-6 md:col-span-3 md:items-end md:text-right">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-1 md:gap-3 [&>div]:min-w-0">
          <div>
            <dt className="label text-ink-soft">{t.common.duration}</dt>
            <dd className="mt-1 text-[14px]">{loc(tour.duration)}</dd>
          </div>
          <div>
            <dt className="label text-ink-soft">{t.common.location}</dt>
            <dd className="mt-1 text-[14px]">{loc(tour.location)}</dd>
          </div>
          <div className="col-span-2 md:col-span-1">
            <dt className="label text-ink-soft">{t.common.perPerson}</dt>
            <dd className="price mt-1 whitespace-nowrap text-ink-soft">{price(tour.price)}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => openBooking(tour.id)} className={buttonClasses('clay', 'md:mt-auto')}>
          {t.common.book}
        </button>
      </div>
    </article>
  );
}
