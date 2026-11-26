'use client';

import React from 'react';
import { GemIcon, MessageCircleIcon, StarIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { OrnamentDivider } from './PremiumOrnaments';
import { useBooking } from '../../contexts/BookingContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { useTours } from '../../contexts/ToursContext';
import { site } from '../../data/site';
import { whatsappUrl } from '../../utils/booking';
import { buttonClasses } from '../../utils/styles';

export function PremiumExperiences() {
  const { openBooking } = useBooking();
  const { premiumTours } = useTours();
  const { t, loc, price } = useTranslation();
  const p = t.premiumPage;

  return (
    <div>
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel className="text-gold-pale">{p.experiencesLabel}</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <RichText text={p.experiencesTitle} emClassName="text-gold-soft" />
          </h2>
        </div>
      </Reveal>

      <div className="mt-6">
        {premiumTours.map((tour, i) => {
          const flip = i % 2 === 1;
          const title = loc(tour.title);
          return (
            <article
              key={tour.id}
              className="grid gap-10 border-t border-gold/25 py-16 first-of-type:mt-10 md:grid-cols-12 md:items-center md:gap-6 md:py-24"
            >
              <div className={`md:col-span-7 ${flip ? 'md:col-start-6' : ''}`}>
                <div className="group rounded-media p-2 ring-1 ring-gold/40 transition-[box-shadow] duration-300 hover:ring-gold">
                  <div className="aspect-[16/11] overflow-hidden rounded-[6px] bg-lagoon-deep">
                    <img
                      src={tour.image}
                      alt={title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
              <Reveal className={`min-w-0 md:col-span-4 ${flip ? 'md:order-first md:col-start-1' : 'md:col-start-9'}`}>
                <p className="label flex items-center gap-2 text-gold-pale">
                  <GemIcon className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
                  {loc(tour.duration)} · {loc(tour.location)}
                </p>
                <h3 className="mt-4 break-words font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-5xl">
                  {title}
                </h3>
                <p className="mt-3 text-[17px] font-medium text-gold-pale/90">{loc(tour.subtitle)}</p>
                <p className="mt-6 text-[15px] leading-[1.8] text-sand/80">{loc(tour.description)}</p>

                <p className="label mt-8 text-sand/60">{p.includesLabel}</p>
                <ul className="mt-3 border-t border-gold/25">
                  {loc(tour.includes).map((inc) => (
                    <li key={inc} className="flex items-center gap-3 border-b border-gold/25 py-3 text-[15px] text-sand/90">
                      <StarIcon className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
                      {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="price text-gold-pale/80">
                    {price(tour.price)} <span className="text-sand/55">· {loc(tour.priceNote)}</span>
                  </p>
                  <button type="button" onClick={() => openBooking(tour.id)} className={buttonClasses('gold')}>
                    {t.common.book}
                  </button>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>

      <OrnamentDivider className="mt-4" />

      <section className="grid gap-8 pt-16 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:col-span-7 md:text-6xl">
          <RichText text={p.conciergeTitle} emClassName="text-gold-soft" />
        </h2>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[15px] leading-relaxed text-sand/80">
            {p.conciergeBody} <span className="whitespace-nowrap tabular-nums">{site.phoneDisplay}</span>
          </p>
          <a href={whatsappUrl(p.conciergeMessage)} target="_blank" rel="noreferrer" className={buttonClasses('goldOutline', 'mt-6')}>
            <MessageCircleIcon /> {p.conciergeCta}
          </a>
        </div>
      </section>
    </div>
  );
}
