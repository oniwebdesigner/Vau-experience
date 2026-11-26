'use client';

import React from 'react';
import { BikeIcon, MessageCircleIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { RevealImage } from '../RevealImage';
import { RichText } from '../RichText';
import { SectionLabel } from '../SectionLabel';
import { useTranslation } from '../../contexts/LanguageContext';
import { bikeRental } from '../../data/bikes';
import { whatsappUrl } from '../../utils/booking';
import { buttonClasses } from '../../utils/styles';

export function BikeRental() {
  const { loc } = useTranslation();

  return (
    <section id="bicikleta" className="mx-auto max-w-site scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-6">
        <div className="md:col-span-6">
          <RevealImage src={bikeRental.image} alt={loc(bikeRental.imageAlt)} className="aspect-[4/3] rounded-media" />
        </div>

        <Reveal className="min-w-0 md:col-span-5 md:col-start-8">
          <SectionLabel>{loc(bikeRental.label)}</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            <RichText text={loc(bikeRental.title)} emClassName="text-lagoon" />
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">{loc(bikeRental.description)}</p>

          <ul className="mt-8 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-8">
            {loc(bikeRental.points).map((p) => (
              <li key={p} className="flex items-center gap-3 border-b border-ink/15 py-3 text-[15px]">
                <BikeIcon className="h-4 w-4 shrink-0 text-lagoon" strokeWidth={1.5} aria-hidden />
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={whatsappUrl(loc(bikeRental.whatsappMessage))}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses('primary')}
            >
              <MessageCircleIcon /> {loc(bikeRental.cta)}
            </a>
            <p className="price text-ink-soft">{loc(bikeRental.priceNote)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
