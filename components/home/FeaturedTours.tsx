'use client';

import React, { useState } from 'react';
import { Link } from '@/lib/router';
import { ArrowRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { TourCard } from '../TourCard';
import { TourDetailModal } from '../TourDetailModal';
import { useTranslation } from '../../contexts/LanguageContext';
import { useTours } from '../../contexts/ToursContext';
import type { Tour } from '../../types/tour';

export function FeaturedTours() {
  const [openTour, setOpenTour] = useState<Tour | null>(null);
  const { t } = useTranslation();
  const { tours } = useTours();
  // Tours marked "featured" in the admin; if none are marked, the first three tours are shown.
  const marked = tours.filter((tour) => tour.featured);
  const featured = (marked.length > 0 ? marked : tours).slice(0, 3);
  const [first, ...rest] = featured;

  if (featured.length === 0) return null;

  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-site px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel>{t.featured.label}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <RichText text={t.featured.title} emClassName="text-lagoon" />
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-4 md:col-start-9 md:text-right">
            <Link
              to="/touret"
              className="group inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[14px] font-medium transition-colors duration-200 hover:border-clay hover:text-clay"
            >
              {t.featured.all}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-x-10">
          {first && (
            <Reveal className="md:col-span-7">
              <TourCard tour={first} size="large" onOpen={setOpenTour} />
            </Reveal>
          )}
          <div className="flex flex-col gap-14 md:col-span-5">
            {rest.map((tour, i) => (
              <Reveal key={tour.id} delay={0.06 * (i + 1)}>
                <TourCard tour={tour} size="compact" onOpen={setOpenTour} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <TourDetailModal tour={openTour} onClose={() => setOpenTour(null)} />
    </section>
  );
}
