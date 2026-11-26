'use client';

import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from '@/lib/router';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircleIcon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { TourRow } from '../components/tours/TourRow';
import { MobileCategoryFilter, type FilterOption } from '../components/tours/MobileCategoryFilter';
import { TourDetailModal } from '../components/TourDetailModal';
import { CustomRequest } from '../components/home/CustomRequest';
import { useTranslation } from '../contexts/LanguageContext';
import { useTours } from '../contexts/ToursContext';
import { categories } from '../data/categories';
import { bikeRental } from '../data/bikes';
import { usePageMeta } from '../hooks/usePageMeta';
import type { Tour, TourCategory } from '../types/tour';
import { whatsappUrl } from '../utils/booking';
import { buttonClasses } from '../utils/styles';
import { easeOut } from '../utils/motion';

export function Tours() {
  usePageMeta('tours');
  const { t, loc } = useTranslation();
  const [params, setParams] = useSearchParams();
  const { tours } = useTours();
  const [openTour, setOpenTour] = useState<Tour | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const requested = params.get('kategoria');
  // Only categories that currently have at least one published tour are offered as filters.
  const usedCategories = useMemo(
    () => categories.filter((c) => tours.some((tour) => tour.category === c.name)),
    [tours],
  );
  const active = usedCategories.some((c) => c.name === requested) ? (requested as TourCategory) : null;

  const visible = useMemo(
    () => (active ? tours.filter((tour) => tour.category === active) : tours),
    [active, tours],
  );

  const select = (name: TourCategory | null) => {
    if (name) setParams({ kategoria: name }, { replace: true });
    else setParams({}, { replace: true });
  };

  const pills: FilterOption[] = [
    { label: t.toursPage.all, value: null },
    ...usedCategories.map((c) => ({ label: loc(c.label), value: c.name })),
  ];

  return (
    <>
      <PageHeader label={t.toursPage.label} title={t.toursPage.title} intro={t.common.trust} />

      <section className="mx-auto max-w-site overflow-x-clip px-5 pb-24 md:px-10 md:pb-32">
        <MobileCategoryFilter options={pills} active={active} onSelect={select} listRef={listRef} />

        <div className="sticky top-20 z-20 -mx-10 hidden border-b border-ink/10 bg-sand px-10 py-4 md:block">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.toursPage.filterLabel}>
            {pills.map((p) => {
              const isActive = active === p.value;
              return (
                <button
                  key={p.value ?? 'all'}
                  type="button"
                  onClick={() => select(p.value)}
                  aria-pressed={isActive}
                  className={`inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border px-4 text-[13px] transition-colors duration-200 ${
                    isActive ? 'border-lagoon bg-lagoon text-sand' : 'border-ink/20 text-ink hover:border-ink/60'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={listRef} className="mt-4 scroll-mt-36">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((tour, i) => (
              <motion.div
                key={`${active ?? 'all'}-${tour.id}`}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2), ease: easeOut }}
              >
                <TourRow tour={tour} onOpen={setOpenTour} />
              </motion.div>
            ))}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="border-b border-ink/15 py-20">
              <p className="font-display text-3xl font-semibold tracking-[-0.03em]">{t.toursPage.empty}</p>
              <button type="button" onClick={() => select(null)} className={buttonClasses('outline', 'mt-6')}>
                {t.toursPage.showAll}
              </button>
            </div>
          )}
        </div>

        <aside className="mt-16 grid gap-6 rounded-media border border-ink/15 bg-sand-paper p-6 sm:grid-cols-[auto_1fr] sm:items-center md:p-8 lg:grid-cols-[auto_1fr_auto]">
          <img src={bikeRental.image} alt="" className="h-24 w-full rounded-[6px] object-cover sm:h-20 sm:w-28" />
          <div className="min-w-0">
            <p className="font-display text-2xl font-semibold tracking-[-0.03em]">{loc(bikeRental.label)}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{loc(bikeRental.noteBody)}</p>
            <p className="price mt-2 text-ink-soft">{loc(bikeRental.priceNote)}</p>
          </div>
          <a
            href={whatsappUrl(loc(bikeRental.whatsappMessage))}
            target="_blank"
            rel="noreferrer"
            className={buttonClasses('outline', 'sm:col-span-2 lg:col-span-1')}
          >
            <MessageCircleIcon /> {loc(bikeRental.cta)}
          </a>
        </aside>
      </section>

      <CustomRequest />

      <TourDetailModal tour={openTour} onClose={() => setOpenTour(null)} />
    </>
  );
}
