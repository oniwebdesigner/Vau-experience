'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Modal } from './Modal';
import { useBooking } from '../contexts/BookingContext';
import { useTranslation } from '../contexts/LanguageContext';
import type { Tour } from '../types/tour';
import { getCategory } from '../utils/bookable';
import { buttonClasses } from '../utils/styles';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
}

export function TourDetailModal({ tour, onClose }: TourDetailModalProps) {
  const { openBooking } = useBooking();
  const { t, loc, price } = useTranslation();
  const [shown, setShown] = useState<Tour | null>(tour);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (tour) {
      setShown(tour);
      setActive(0);
    }
  }, [tour]);

  const book = () => {
    if (!shown) return;
    onClose();
    openBooking(shown.id);
  };

  const title = shown ? loc(shown.title) : '';

  return (
    <Modal open={tour !== null} onClose={onClose} labelledBy="tour-detail-title" className="max-w-6xl">
      {shown && (
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="bg-lagoon-night md:sticky md:top-0 md:self-start">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[5/6]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={shown.gallery[active]}
                  src={shown.gallery[active]}
                  alt={t.tourDetail.photoAlt(title, active + 1)}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <div className="flex gap-2 p-3" role="group" aria-label={t.tourDetail.galleryAria}>
              {shown.gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={t.tourDetail.showPhoto(i + 1)}
                  aria-pressed={i === active}
                  className={`h-14 w-20 overflow-hidden transition-opacity duration-200 ${
                    i === active ? 'opacity-100 outline outline-1 outline-offset-2 outline-sand' : 'opacity-50 hover:opacity-90'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col px-6 pb-8 pt-10 sm:px-10 md:pt-14">
            <p className="label text-clay">
              {loc(getCategory(shown.category).label)} · {loc(shown.duration)}
            </p>
            <h2
              id="tour-detail-title"
              className="mt-4 pr-10 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{loc(shown.location)}</p>
            <p className="mt-6 text-[15px] leading-[1.75] text-ink/85">{loc(shown.description)}</p>

            <ul className="mt-8 border-t border-ink/15">
              {loc(shown.highlights).map((h) => (
                <li key={h} className="flex items-center gap-3 border-b border-ink/15 py-3 text-[15px]">
                  <CheckIcon className="h-4 w-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
                  {h}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="min-w-0">
                <dt className="label text-ink-soft">{t.common.duration}</dt>
                <dd className="mt-2 text-[14px] leading-snug">{loc(shown.duration)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="label text-ink-soft">{t.common.group}</dt>
                <dd className="mt-2 text-[14px] leading-snug">{loc(shown.groupSize)}</dd>
              </div>
              <div className="col-span-2 min-w-0 sm:col-span-1">
                <dt className="label text-ink-soft">{t.common.perPerson}</dt>
                <dd className="price mt-2 whitespace-nowrap text-ink-soft">{price(shown.price)}</dd>
              </div>
            </dl>

            <button type="button" onClick={book} className={buttonClasses('clay', 'mt-10 w-full')}>
              {t.tourDetail.bookThis} <ArrowRightIcon />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
