'use client';

import React from 'react';
import { Reveal } from '../Reveal';
import { useTranslation } from '../../contexts/LanguageContext';
import { images } from '../../data/images';

export function QuoteBand() {
  const { t } = useTranslation();
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-lagoon-night text-sand">
      <img src={images.sunset} alt={t.quote.imageAlt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/45" aria-hidden />
      <div className="relative mx-auto w-full max-w-site px-5 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-4xl">
          <blockquote>
            <p className="font-display text-[clamp(2rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              {t.quote.text}
            </p>
            <footer className="label mt-8 text-sand/85">{t.quote.author}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
